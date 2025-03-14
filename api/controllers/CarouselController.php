<?php
class CarouselController {
    private $conn;
    private $uploadDir = '../uploads/carousel/';
    private $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    private $maxFileSize = 5242880; // 5MB
    
    public function __construct($conn) {
        $this->conn = $conn;
        
        // Create upload directory if it doesn't exist
        if (!file_exists($this->uploadDir)) {
            mkdir($this->uploadDir, 0755, true);
        }
    }
    
    // Get all carousel images
    public function getAll() {
        try {
            $stmt = $this->conn->prepare("
                SELECT * FROM carousel_images 
                ORDER BY `order` ASC
            ");
            $stmt->execute();
            $images = $stmt->fetchAll();
            
            // Transform file paths to URLs
            foreach ($images as &$image) {
                if ($image['file_path']) {
                    $image['url'] = '/uploads/carousel/' . basename($image['file_path']);
                }
            }
            
            echo json_encode($images);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Get one image by ID
    public function getOne($id) {
        try {
            $stmt = $this->conn->prepare("
                SELECT * FROM carousel_images 
                WHERE id = :id
            ");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $image = $stmt->fetch();
            
            if ($image) {
                if ($image['file_path']) {
                    $image['url'] = '/uploads/carousel/' . basename($image['file_path']);
                }
                echo json_encode($image);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Image not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Create a new image
    public function create($data) {
        try {
            // Validate required fields
            if (!isset($data['title']) || !isset($data['alt']) || !isset($data['order'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Title, alt text and order are required']);
                return;
            }
            
            $url = null;
            $filePath = null;
            $fileName = null;
            $fileSize = null;
            
            // Handle file upload
            if (isset($data['files']['image'])) {
                $file = $data['files']['image'];
                
                // Validate file
                if ($file['error'] !== UPLOAD_ERR_OK) {
                    http_response_code(400);
                    echo json_encode(['error' => 'File upload failed']);
                    return;
                }
                
                if (!in_array($file['type'], $this->allowedTypes)) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Invalid file type. Only JPEG, PNG and WebP are allowed']);
                    return;
                }
                
                if ($file['size'] > $this->maxFileSize) {
                    http_response_code(400);
                    echo json_encode(['error' => 'File too large. Maximum size is 5MB']);
                    return;
                }
                
                // Generate unique filename
                $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
                $filename = uniqid() . '.' . $ext;
                $filePath = $this->uploadDir . $filename;
                
                // Move uploaded file
                if (!move_uploaded_file($file['tmp_name'], $filePath)) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to save file']);
                    return;
                }
                
                $fileName = $file['name'];
                $fileSize = $file['size'];
            } else if (isset($data['url'])) {
                $url = $data['url'];
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Either file or URL must be provided']);
                return;
            }
            
            // Insert into database
            $stmt = $this->conn->prepare("
                INSERT INTO carousel_images (
                    title, url, alt, `order`, 
                    file_path, file_name, file_size
                ) VALUES (
                    :title, :url, :alt, :order,
                    :file_path, :file_name, :file_size
                )
            ");
            
            $stmt->bindParam(':title', $data['title']);
            $stmt->bindParam(':url', $url);
            $stmt->bindParam(':alt', $data['alt']);
            $stmt->bindParam(':order', $data['order']);
            $stmt->bindParam(':file_path', $filePath);
            $stmt->bindParam(':file_name', $fileName);
            $stmt->bindParam(':file_size', $fileSize);
            
            $stmt->execute();
            $id = $this->conn->lastInsertId();
            
            // Get created image
            $stmt = $this->conn->prepare("SELECT * FROM carousel_images WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $image = $stmt->fetch();
            
            if ($image['file_path']) {
                $image['url'] = '/uploads/carousel/' . basename($image['file_path']);
            }
            
            http_response_code(201);
            echo json_encode($image);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Update an image
    public function update($id, $data) {
        try {
            // Check if image exists
            $checkStmt = $this->conn->prepare("SELECT * FROM carousel_images WHERE id = :id");
            $checkStmt->bindParam(':id', $id);
            $checkStmt->execute();
            $existingImage = $checkStmt->fetch();
            
            if (!$existingImage) {
                http_response_code(404);
                echo json_encode(['error' => 'Image not found']);
                return;
            }
            
            $url = $existingImage['url'];
            $filePath = $existingImage['file_path'];
            $fileName = $existingImage['file_name'];
            $fileSize = $existingImage['file_size'];
            
            // Handle file upload
            if (isset($data['files']['image'])) {
                $file = $data['files']['image'];
                
                // Validate file
                if ($file['error'] !== UPLOAD_ERR_OK) {
                    http_response_code(400);
                    echo json_encode(['error' => 'File upload failed']);
                    return;
                }
                
                if (!in_array($file['type'], $this->allowedTypes)) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Invalid file type. Only JPEG, PNG and WebP are allowed']);
                    return;
                }
                
                if ($file['size'] > $this->maxFileSize) {
                    http_response_code(400);
                    echo json_encode(['error' => 'File too large. Maximum size is 5MB']);
                    return;
                }
                
                // Generate unique filename
                $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
                $filename = uniqid() . '.' . $ext;
                $filePath = $this->uploadDir . $filename;
                
                // Move uploaded file
                if (!move_uploaded_file($file['tmp_name'], $filePath)) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to save file']);
                    return;
                }
                
                // Delete old file if exists
                if ($existingImage['file_path'] && file_exists($existingImage['file_path'])) {
                    unlink($existingImage['file_path']);
                }
                
                $url = null;
                $fileName = $file['name'];
                $fileSize = $file['size'];
            } else if (isset($data['url'])) {
                // Delete old file if exists
                if ($existingImage['file_path'] && file_exists($existingImage['file_path'])) {
                    unlink($existingImage['file_path']);
                }
                
                $url = $data['url'];
                $filePath = null;
                $fileName = null;
                $fileSize = null;
            }
            
            $stmt = $this->conn->prepare("
                UPDATE carousel_images 
                SET title = :title,
                    url = :url,
                    alt = :alt,
                    `order` = :order,
                    file_path = :file_path,
                    file_name = :file_name,
                    file_size = :file_size
                WHERE id = :id
            ");
            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':title', $data['title']);
            $stmt->bindParam(':url', $url);
            $stmt->bindParam(':alt', $data['alt']);
            $stmt->bindParam(':order', $data['order']);
            $stmt->bindParam(':file_path', $filePath);
            $stmt->bindParam(':file_name', $fileName);
            $stmt->bindParam(':file_size', $fileSize);
            
            $stmt->execute();
            
            // Get updated image
            $stmt = $this->conn->prepare("SELECT * FROM carousel_images WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $image = $stmt->fetch();
            
            if ($image['file_path']) {
                $image['url'] = '/uploads/carousel/' . basename($image['file_path']);
            }
            
            echo json_encode($image);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Delete an image
    public function delete($id) {
        try {
            // Check if image exists and get file path
            $checkStmt = $this->conn->prepare("SELECT * FROM carousel_images WHERE id = :id");
            $checkStmt->bindParam(':id', $id);
            $checkStmt->execute();
            $image = $checkStmt->fetch();
            
            if (!$image) {
                http_response_code(404);
                echo json_encode(['error' => 'Image not found']);
                return;
            }
            
            // Delete file if exists
            if ($image['file_path'] && file_exists($image['file_path'])) {
                unlink($image['file_path']);
            }
            
            $stmt = $this->conn->prepare("DELETE FROM carousel_images WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            
            echo json_encode(['message' => 'Image deleted successfully']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}