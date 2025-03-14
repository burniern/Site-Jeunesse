<?php
class AuthController {
    private $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    // Login user
    public function login($data) {
        try {
            // Validate required fields
            if (!isset($data['username']) || !isset($data['password'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Username and password are required']);
                return;
            }
            
            // Get user by username
            $stmt = $this->conn->prepare("SELECT id, username, password, role FROM users WHERE username = :username");
            $stmt->bindParam(':username', $data['username']);
            $stmt->execute();
            $user = $stmt->fetch();
            
            // Check if user exists and password is correct
            if (!$user || !password_verify($data['password'], $user['password'])) {
                http_response_code(401);
                echo json_encode(['error' => 'Invalid credentials']);
                return;
            }
            
            // Generate token
            $token = bin2hex(random_bytes(32));
            $expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));
            
            // Store token in database
            $stmt = $this->conn->prepare("
                INSERT INTO tokens (user_id, token, expires_at) 
                VALUES (:user_id, :token, :expires_at)
            ");
            
            $stmt->bindParam(':user_id', $user['id']);
            $stmt->bindParam(':token', $token);
            $stmt->bindParam(':expires_at', $expiresAt);
            $stmt->execute();
            
            // Update last login
            $stmt = $this->conn->prepare("UPDATE users SET last_login = NOW() WHERE id = :id");
            $stmt->bindParam(':id', $user['id']);
            $stmt->execute();
            
            // Return user data and token
            echo json_encode([
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'role' => $user['role']
                ]
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Get current user
    public function getCurrentUser() {
        try {
            // Get authorization header
            $headers = getallheaders();
            $authHeader = $headers['Authorization'] ?? '';
            
            if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
                http_response_code(401);
                echo json_encode(['error' => 'Unauthorized']);
                return;
            }
            
            $token = $matches[1];
            
            // Get user by token
            $stmt = $this->conn->prepare("
                SELECT u.id, u.username, u.role 
                FROM users u
                JOIN tokens t ON u.id = t.user_id
                WHERE t.token = :token AND t.expires_at > NOW()
            ");
            $stmt->bindParam(':token', $token);
            $stmt->execute();
            $user = $stmt->fetch();
            
            if (!$user) {
                http_response_code(401);
                echo json_encode(['error' => 'Invalid or expired token']);
                return;
            }
            
            // Return user data
            echo json_encode(['user' => $user]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}