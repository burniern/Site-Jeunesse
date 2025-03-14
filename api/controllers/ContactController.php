<?php
class ContactController {
    private $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    // Handle contact form submission
    public function create($data) {
        try {
            // Validate required fields
            if (!isset($data['name']) || !isset($data['email']) || !isset($data['subject']) || !isset($data['message'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Name, email, subject, and message are required']);
                return;
            }
            
            // Validate email
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid email format']);
                return;
            }
            
            // Insert into database
            $stmt = $this->conn->prepare("
                INSERT INTO contact_messages (name, email, subject, message) 
                VALUES (:name, :email, :subject, :message)
            ");
            
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':email', $data['email']);
            $stmt->bindParam(':subject', $data['subject']);
            $stmt->bindParam(':message', $data['message']);
            
            $stmt->execute();
            
            // In a real application, you might also want to send an email notification
            // to the site administrators
            
            http_response_code(201);
            echo json_encode(['message' => 'Message sent successfully']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Get all contact messages (admin only)
    public function getAll() {
        try {
            // Check if user is authenticated and has admin role
            $this->checkAdminAuth();
            
            $stmt = $this->conn->prepare("SELECT * FROM contact_messages ORDER BY created_at DESC");
            $stmt->execute();
            $messages = $stmt->fetchAll();
            
            echo json_encode($messages);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Get one contact message by ID (admin only)
    public function getOne($id) {
        try {
            // Check if user is authenticated and has admin role
            $this->checkAdminAuth();
            
            $stmt = $this->conn->prepare("SELECT * FROM contact_messages WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $message = $stmt->fetch();
            
            if ($message) {
                echo json_encode($message);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Message not found']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Delete a contact message (admin only)
    public function delete($id) {
        try {
            // Check if user is authenticated and has admin role
            $this->checkAdminAuth();
            
            // Check if message exists
            $checkStmt = $this->conn->prepare("SELECT id FROM contact_messages WHERE id = :id");
            $checkStmt->bindParam(':id', $id);
            $checkStmt->execute();
            
            if (!$checkStmt->fetch()) {
                http_response_code(404);
                echo json_encode(['error' => 'Message not found']);
                return;
            }
            
            $stmt = $this->conn->prepare("DELETE FROM contact_messages WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            
            echo json_encode(['message' => 'Message deleted successfully']);
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