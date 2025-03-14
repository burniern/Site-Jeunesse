<?php
class UserController {
    private $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    // Get all users
    public function getAll() {
        try {
            // Check if user is authenticated and has admin role
            $this->checkAdminAuth();
            
            $stmt = $this->conn->prepare("SELECT id, username, email, role, last_login FROM users");
            $stmt->execute();
            $users = $stmt->fetchAll();
            
            echo json_encode($users);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Get one user by ID
    public function getOne($id) {
        try {
            // Check if user is authenticated and has admin role
            $this->checkAdminAuth();
            
            $stmt = $this->conn->prepare("SELECT id, username, email, role, last_login FROM users WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $user = $stmt->fetch();
            
            if ($user) {
                echo json_encode($user);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'User not found']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Create a new user
    public function create($data) {
        try {
            // Check if user is authenticated and has admin role
            $this->checkAdminAuth();
            
            // Validate required fields
            if (!isset($data['username']) || !isset($data['email']) || !isset($data['password']) || !isset($data['role'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Username, email, password, and role are required']);
                return;
            }
            
            // Check if username already exists
            $checkStmt = $this->conn->prepare("SELECT id FROM users WHERE username = :username");
            $checkStmt->bindParam(':username', $data['username']);
            $checkStmt->execute();
            
            if ($checkStmt->fetch()) {
                http_response_code(409);
                echo json_encode(['error' => 'Username already exists']);
                return;
            }
            
            // Check if email already exists
            $checkStmt = $this->conn->prepare("SELECT id FROM users WHERE email = :email");
            $checkStmt->bindParam(':email', $data['email']);
            $checkStmt->execute();
            
            if ($checkStmt->fetch()) {
                http_response_code(409);
                echo json_encode(['error' => 'Email already exists']);
                return;
            }
            
            // Hash the password
            $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
            
            $stmt = $this->conn->prepare("
                INSERT INTO users (username, email, password, role) 
                VALUES (:username, :email, :password, :role)
            ");
            
            $stmt->bindParam(':username', $data['username']);
            $stmt->bindParam(':email', $data['email']);
            $stmt->bindParam(':password', $hashedPassword);
            $stmt->bindParam(':role', $data['role']);
            
            $stmt->execute();
            $id = $this->conn->lastInsertId();
            
            http_response_code(201);
            echo json_encode(['id' => $id, 'message' => 'User created successfully']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Update a user
    public function update($id, $data) {
        try {
            // Check if user is authenticated and has admin role
            $this->checkAdminAuth();
            
            // Check if user exists
            $checkStmt = $this->conn->prepare("SELECT id FROM users WHERE id = :id");
            $checkStmt->bindParam(':id', $id);
            $checkStmt->execute();
            
            if (!$checkStmt->fetch()) {
                http_response_code(404);
                echo json_encode(['error' => 'User not found']);
                return;
            }
            
            // Start building the query
            $query = "UPDATE users SET ";
            $params = [];
            
            // Add fields to update
            if (isset($data['email'])) {
                $query .= "email = :email, ";
                $params[':email'] = $data['email'];
            }
            
            if (isset($data['role'])) {
                $query .= "role = :role, ";
                $params[':role'] = $data['role'];
            }
            
            if (isset($data['password'])) {
                $query .= "password = :password, ";
                $params[':password'] = password_hash($data['password'], PASSWORD_DEFAULT);
            }
            
            // Remove trailing comma and space
            $query = rtrim($query, ", ");
            
            // Add WHERE clause
            $query .= " WHERE id = :id";
            $params[':id'] = $id;
            
            $stmt = $this->conn->prepare($query);
            
            // Bind all parameters
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            
            $stmt->execute();
            
            echo json_encode(['message' => 'User updated successfully']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Delete a user
    public function delete($id) {
        try {
            // Check if user is authenticated and has admin role
            $this->checkAdminAuth();
            
            // Check if user exists
            $checkStmt = $this->conn->prepare("SELECT id, username FROM users WHERE id = :id");
            $checkStmt->bindParam(':id', $id);
            $checkStmt->execute();
            $user = $checkStmt->fetch();
            
            if (!$user) {
                http_response_code(404);
                echo json_encode(['error' => 'User not found']);
                return;
            }
            
            // Prevent deletion of admin user
            if ($user['username'] === 'admin') {
                http_response_code(403);
                echo json_encode(['error' => 'Cannot delete admin user']);
                return;
            }
            
            $stmt = $this->conn->prepare("DELETE FROM users WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            
            echo json_encode(['message' => 'User deleted successfully']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Check if user is authenticated and has admin role
    private function checkAdminAuth() {
        // Get authorization header
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? '';
        
        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            exit();
        }
        
        $token = $matches[1];
        
        // Verify token
        try {
            // In a real application, you would use a proper JWT library
            // For simplicity, we're just checking if the token exists in the database
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
                exit();
            }
            
            // Check if user has admin role
            if ($user['role'] !== 'Administrateur') {
                http_response_code(403);
                echo json_encode(['error' => 'Forbidden: Admin access required']);
                exit();
            }
            
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
            exit();
        }
    }
}