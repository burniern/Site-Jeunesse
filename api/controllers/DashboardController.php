<?php
class DashboardController {
    private $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    // Obtenir les statistiques du tableau de bord
    public function getStats() {
        try {
            // Nombre total de membres
            $memberStmt = $this->conn->prepare("SELECT COUNT(*) as total FROM members");
            $memberStmt->execute();
            $totalMembers = $memberStmt->fetch()['total'];
            
            // Nombre total d'événements
            $eventStmt = $this->conn->prepare("SELECT COUNT(*) as total FROM events");
            $eventStmt->execute();
            $totalEvents = $eventStmt->fetch()['total'];
            
            // Nombre d'événements à venir
            $upcomingStmt = $this->conn->prepare("
                SELECT COUNT(*) as total 
                FROM events 
                WHERE date >= CURDATE()
            ");
            $upcomingStmt->execute();
            $upcomingEvents = $upcomingStmt->fetch()['total'];
            
            // Nombre d'images dans le carrousel
            $carouselStmt = $this->conn->prepare("SELECT COUNT(*) as total FROM carousel_images");
            $carouselStmt->execute();
            $totalCarouselImages = $carouselStmt->fetch()['total'];
            
            echo json_encode([
                'totalMembers' => $totalMembers,
                'totalEvents' => $totalEvents,
                'upcomingEvents' => $upcomingEvents,
                'totalCarouselImages' => $totalCarouselImages
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Obtenir les événements récents
    public function getRecentEvents() {
        try {
            $stmt = $this->conn->prepare("
                SELECT * FROM events 
                WHERE date >= CURDATE() 
                ORDER BY date ASC 
                LIMIT 5
            ");
            $stmt->execute();
            $events = $stmt->fetchAll();
            
            echo json_encode($events);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
    // Obtenir les activités récentes
    public function getRecentActivities() {
        try {
            $stmt = $this->conn->prepare("
                (SELECT 
                    'member' as type,
                    CONCAT('Membre ', firstName, ' ', lastName) as description,
                    created_at as date
                FROM members
                ORDER BY created_at DESC
                LIMIT 5)
                UNION ALL
                (SELECT 
                    'event' as type,
                    title as description,
                    created_at as date
                FROM events
                ORDER BY created_at DESC
                LIMIT 5)
                ORDER BY date DESC
                LIMIT 10
            ");
            $stmt->execute();
            $activities = $stmt->fetchAll();
            
            echo json_encode($activities);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}