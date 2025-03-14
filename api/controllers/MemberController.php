<?php
class MemberController {
    private $conn;
    private $uploadDir = '../uploads/members/';
    private $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    private $maxFileSize = 5242880; // 5MB
    
    public function __construct($conn) {
        $this->conn = $conn;
        
        // Create upload directory if it doesn't exist
        if (!file_exists($this->uploadDir)) {
            mkdir($this->uploadDir, 0755, true);
        }
    }
    
    // Get all members
    public function getAll() {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM members ORDER BY lastName, firstName");
            $stmt->execute();
            $members = $stmt->fetchAll();
            
            // Transform file paths to URLs
            foreach ($members as &$member) {
                if ($member['photo']) {
                    $member['photo'] = '/uploads/members/' . basename($member['photo']);
                }
            }
            
            echo json_encode($members);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Get one member by ID
    public function getOne($id) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM members WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $member = $stmt->fetch();
            
            if ($member) {
                if ($member['photo']) {
                    $member['photo'] = '/uploads/members/' . basename($member['photo']);
                }
                echo json_encode($member);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Member not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Create a new member
    public function create($data) {
        try {
            // Validate required fields
            if (!isset($data['firstName']) || !isset($data['lastName'])) {
                http_response_code(400);
                echo json_encode(['error' => 'First name and last name are required']);
                return;
            }
            
            // Handle photo upload
            $photoPath = null;
            if (isset($data['files']['photo'])) {
                $photo = $data['files']['photo'];
                
                // Validate file
                if ($photo['error'] !== UPLOAD_ERR_OK) {
                    http_response_code(400);
                    echo json_encode(['error' => 'File upload failed']);
                    return;
                }
                
                if (!in_array($photo['type'], $this->allowedTypes)) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Invalid file type. Only JPEG, PNG and WebP are allowed']);
                    return;
                }
                
                if ($photo['size'] > $this->maxFileSize) {
                    http_response_code(400);
                    echo json_encode(['error' => 'File too large. Maximum size is 5MB']);
                    return;
                }
                
                // Generate unique filename
                $ext = pathinfo($photo['name'], PATHINFO_EXTENSION);
                $filename = uniqid() . '.' . $ext;
                $photoPath = $this->uploadDir . $filename;
                
                // Move uploaded file
                if (!move_uploaded_file($photo['tmp_name'], $photoPath)) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to save file']);
                    return;
                }
            }
            
            $stmt = $this->conn->prepare("
                INSERT INTO members (firstName, lastName, email, phone, photo, role) 
                VALUES (:firstName, :lastName, :email, :phone, :photo, :role)
            ");
            
            $stmt->bindParam(':firstName', $data['firstName']);
            $stmt->bindParam(':lastName', $data['lastName']);
            $stmt->bindParam(':email', $data['email']);
            $stmt->bindParam(':phone', $data['phone']);
            $stmt->bindParam(':photo', $photoPath);
            $stmt->bindParam(':role', $data['role']);
            
            $stmt->execute();
            $id = $this->conn->lastInsertId();
            
            // Get created member
            $stmt = $this->conn->prepare("SELECT * FROM members WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $member = $stmt->fetch();
            
            if ($member['photo']) {
                $member['photo'] = '/uploads/members/' . basename($member['photo']);
            }
            
            http_response_code(201);
            echo json_encode($member);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Update a member
    public function update($id, $data) {
        try {
            // Check if member exists
            $checkStmt = $this->conn->prepare("SELECT photo FROM members WHERE id = :id");
            $checkStmt->bindParam(':id', $id);
            $checkStmt->execute();
            $existingMember = $checkStmt->fetch();
            
            if (!$existingMember) {
                http_response_code(404);
                echo json_encode(['error' => 'Member not found']);
                return;
            }
            
            // Handle photo upload
            $photoPath = $existingMember['photo'];
            if (isset($data['files']['photo'])) {
                $photo = $data['files']['photo'];
                
                // Validate file
                if ($photo['error'] !== UPLOAD_ERR_OK) {
                    http_response_code(400);
                    echo json_encode(['error' => 'File upload failed']);
                    return;
                }
                
                if (!in_array($photo['type'], $this->allowedTypes)) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Invalid file type. Only JPEG, PNG and WebP are allowed']);
                    return;
                }
                
                if ($photo['size'] > $this->maxFileSize) {
                    http_response_code(400);
                    echo json_encode(['error' => 'File too large. Maximum size is 5MB']);
                    return;
                }
                
                // Generate unique filename
                $ext = pathinfo($photo['name'], PATHINFO_EXTENSION);
                $filename = uniqid() . '.' . $ext;
                $photoPath = $this->uploadDir . $filename;
                
                // Move uploaded file
                if (!move_uploaded_file($photo['tmp_name'], $photoPath)) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to save file']);
                    return;
                }
                
                // Delete old photo if exists
                if ($existingMember['photo'] && file_exists($existingMember['photo'])) {
                    unlink($existingMember['photo']);
                }
            }
            
            $stmt = $this->conn->prepare("
                UPDATE members 
                SET firstName = :firstName,
                    lastName = :lastName,
                    email = :email,
                    phone = :phone,
                    photo = :photo,
                    role = :role
                WHERE id = :id
            ");
            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':firstName', $data['firstName']);
            $stmt->bindParam(':lastName', $data['lastName']);
            $stmt->bindParam(':email', $data['email']);
            $stmt->bindParam(':phone', $data['phone']);
            $stmt->bindParam(':photo', $photoPath);
            $stmt->bindParam(':role', $data['role']);
            
            $stmt->execute();
            
            // Get updated member
            $stmt = $this->conn->prepare("SELECT * FROM members WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $member = $stmt->fetch();
            
            if ($member['photo']) {
                $member['photo'] = '/uploads/members/' . basename($member['photo']);
            }
            
            echo json_encode($member);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Delete a member
    public function delete($id) {
        try {
            // Check if member exists and get photo path
            $checkStmt = $this->conn->prepare("SELECT photo FROM members WHERE id = :id");
            $checkStmt->bindParam(':id', $id);
            $checkStmt->execute();
            $member = $checkStmt->fetch();
            
            if (!$member) {
                http_response_code(404);
                echo json_encode(['error' => 'Member not found']);
                return;
            }
            
            // Delete photo file if exists
            if ($member['photo'] && file_exists($member['photo'])) {
                unlink($member['photo']);
            }
            
            $stmt = $this->conn->prepare("DELETE FROM members WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            
            echo json_encode(['message' => 'Member deleted successfully']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}