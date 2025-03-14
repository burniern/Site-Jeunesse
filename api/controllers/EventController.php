<?php
class EventController {
    private $conn;
    private $uploadDir = '../uploads/events/';
    private $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    private $maxFileSize = 5242880; // 5MB
    
    public function __construct($conn) {
        $this->conn = $conn;
        
        // Create upload directory if it doesn't exist
        if (!file_exists($this->uploadDir)) {
            mkdir($this->uploadDir, 0755, true);
        }
    }
    
    // Get all events
    public function getAll() {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM events ORDER BY date");
            $stmt->execute();
            $events = $stmt->fetchAll();
            
            // Transform file paths to URLs
            foreach ($events as &$event) {
                if ($event['image']) {
                    $event['image'] = '/uploads/events/' . basename($event['image']);
                }
            }
            
            echo json_encode($events);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Get upcoming events
    public function getUpcoming() {
        try {
            $today = date('Y-m-d');
            $stmt = $this->conn->prepare("
                SELECT * FROM events 
                WHERE date >= :today 
                ORDER BY date 
                LIMIT 3
            ");
            $stmt->bindParam(':today', $today);
            $stmt->execute();
            $events = $stmt->fetchAll();
            
            // Transform file paths to URLs
            foreach ($events as &$event) {
                if ($event['image']) {
                    $event['image'] = '/uploads/events/' . basename($event['image']);
                }
            }
            
            echo json_encode($events);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Get one event by ID
    public function getOne($id) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM events WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $event = $stmt->fetch();
            
            if ($event) {
                if ($event['image']) {
                    $event['image'] = '/uploads/events/' . basename($event['image']);
                }
                echo json_encode($event);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Event not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Create a new event
    public function create($data) {
        try {
            // Validate required fields
            if (!isset($data['title']) || !isset($data['date']) || !isset($data['time']) || !isset($data['location']) || !isset($data['description'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Title, date, time, location, and description are required']);
                return;
            }
            
            // Handle image upload
            $imagePath = null;
            if (isset($data['files']['image'])) {
                $image = $data['files']['image'];
                
                // Validate file
                if ($image['error'] !== UPLOAD_ERR_OK) {
                    http_response_code(400);
                    echo json_encode(['error' => 'File upload failed']);
                    return;
                }
                
                if (!in_array($image['type'], $this->allowedTypes)) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Invalid file type. Only JPEG, PNG and WebP are allowed']);
                    return;
                }
                
                if ($image['size'] > $this->maxFileSize) {
                    http_response_code(400);
                    echo json_encode(['error' => 'File too large. Maximum size is 5MB']);
                    return;
                }
                
                // Generate unique filename
                $ext = pathinfo($image['name'], PATHINFO_EXTENSION);
                $filename = uniqid() . '.' . $ext;
                $imagePath = $this->uploadDir . $filename;
                
                // Move uploaded file
                if (!move_uploaded_file($image['tmp_name'], $imagePath)) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to save file']);
                    return;
                }
            }
            
            $stmt = $this->conn->prepare("
                INSERT INTO events (title, date, time, location, description, image) 
                VALUES (:title, :date, :time, :location, :description, :image)
            ");
            
            $stmt->bindParam(':title', $data['title']);
            $stmt->bindParam(':date', $data['date']);
            $stmt->bindParam(':time', $data['time']);
            $stmt->bindParam(':location', $data['location']);
            $stmt->bindParam(':description', $data['description']);
            $stmt->bindParam(':image', $imagePath);
            
            $stmt->execute();
            $id = $this->conn->lastInsertId();
            
            // Get created event
            $stmt = $this->conn->prepare("SELECT * FROM events WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $event = $stmt->fetch();
            
            if ($event['image']) {
                $event['image'] = '/uploads/events/' . basename($event['image']);
            }
            
            http_response_code(201);
            echo json_encode($event);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Update an event
    public function update($id, $data) {
        try {
            // Check if event exists
            $checkStmt = $this->conn->prepare("SELECT image FROM events WHERE id = :id");
            $checkStmt->bindParam(':id', $id);
            $checkStmt->execute();
            $existingEvent = $checkStmt->fetch();
            
            if (!$existingEvent) {
                http_response_code(404);
                echo json_encode(['error' => 'Event not found']);
                return;
            }
            
            // Handle image upload
            $imagePath = $existingEvent['image'];
            if (isset($data['files']['image'])) {
                $image = $data['files']['image'];
                
                // Validate file
                if ($image['error'] !== UPLOAD_ERR_OK) {
                    http_response_code(400);
                    echo json_encode(['error' => 'File upload failed']);
                    return;
                }
                
                if (!in_array($image['type'], $this->allowedTypes)) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Invalid file type. Only JPEG, PNG and WebP are allowed']);
                    return;
                }
                
                if ($image['size'] > $this->maxFileSize) {
                    http_response_code(400);
                    echo json_encode(['error' => 'File too large. Maximum size is 5MB']);
                    return;
                }
                
                // Generate unique filename
                $ext = pathinfo($image['name'], PATHINFO_EXTENSION);
                $filename = uniqid() . '.' . $ext;
                $imagePath = $this->uploadDir . $filename;
                
                // Move uploaded file
                if (!move_uploaded_file($image['tmp_name'], $imagePath)) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to save file']);
                    return;
                }
                
                // Delete old image if exists
                if ($existingEvent['image'] && file_exists($existingEvent['image'])) {
                    unlink($existingEvent['image']);
                }
            }
            
            $stmt = $this->conn->prepare("
                UPDATE events 
                SET title = :title,
                    date = :date,
                    time = :time,
                    location = :location,
                    description = :description,
                    image = :image
                WHERE id = :id
            ");
            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':title', $data['title']);
            $stmt->bindParam(':date', $data['date']);
            $stmt->bindParam(':time', $data['time']);
            $stmt->bindParam(':location', $data['location']);
            $stmt->bindParam(':description', $data['description']);
            $stmt->bindParam(':image', $imagePath);
            
            $stmt->execute();
            
            // Get updated event
            $stmt = $this->conn->prepare("SELECT * FROM events WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $event = $stmt->fetch();
            
            if ($event['image']) {
                $event['image'] = '/uploads/events/' . basename($event['image']);
            }
            
            echo json_encode($event);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Delete an event
    public function delete($id) {
        try {
            // Check if event exists and get image path
            $checkStmt = $this->conn->prepare("SELECT image FROM events WHERE id = :id");
            $checkStmt->bindParam(':id', $id);
            $checkStmt->execute();
            $event = $checkStmt->fetch();
            
            if (!$event) {
                http_response_code(404);
                echo json_encode(['error' => 'Event not found']);
                return;
            }
            
            // Delete image file if exists
            if ($event['image'] && file_exists($event['image'])) {
                unlink($event['image']);
            }
            
            $stmt = $this->conn->prepare("DELETE FROM events WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            
            echo json_encode(['message' => 'Event deleted successfully']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}