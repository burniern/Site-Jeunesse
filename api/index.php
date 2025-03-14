<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Parse the URL to determine the endpoint
$request_uri = $_SERVER['REQUEST_URI'];
$uri_parts = explode('/', trim($request_uri, '/'));

// Remove 'api' from the beginning if present
if ($uri_parts[0] === 'api') {
    array_shift($uri_parts);
}

// Get the endpoint and ID if provided
$endpoint = $uri_parts[0] ?? '';
$id = $uri_parts[1] ?? null;

// Include database connection
require_once 'config/database.php';

// Include controllers
require_once 'controllers/MemberController.php';
require_once 'controllers/EventController.php';
require_once 'controllers/UserController.php';
require_once 'controllers/ContactController.php';
require_once 'controllers/AuthController.php';
require_once 'controllers/CarouselController.php';
require_once 'controllers/DashboardController.php';

// Route the request to the appropriate controller
try {
    switch ($endpoint) {
        case 'members':
            $controller = new MemberController($conn);
            handleRequest($controller, $id);
            break;
            
        case 'events':
            $controller = new EventController($conn);
            if (isset($uri_parts[1]) && $uri_parts[1] === 'upcoming') {
                $controller->getUpcoming();
            } else {
                handleRequest($controller, $id);
            }
            break;
            
        case 'users':
            $controller = new UserController($conn);
            handleRequest($controller, $id);
            break;
            
        case 'contact':
            $controller = new ContactController($conn);
            handleRequest($controller, $id);
            break;
            
        case 'auth':
            $controller = new AuthController($conn);
            handleAuthRequest($controller, $uri_parts);
            break;
            
        case 'carousel':
            $controller = new CarouselController($conn);
            handleRequest($controller, $id);
            break;
            
        case 'dashboard':
            $controller = new DashboardController($conn);
            if (isset($uri_parts[1])) {
                switch ($uri_parts[1]) {
                    case 'stats':
                        $controller->getStats();
                        break;
                    case 'recent-events':
                        $controller->getRecentEvents();
                        break;
                    case 'recent-activities':
                        $controller->getRecentActivities();
                        break;
                    default:
                        http_response_code(404);
                        echo json_encode(['error' => 'Endpoint not found']);
                        break;
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Missing dashboard endpoint']);
            }
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

// Function to handle standard CRUD requests
function handleRequest($controller, $id) {
    $method = $_SERVER['REQUEST_METHOD'];
    
    switch ($method) {
        case 'GET':
            if ($id) {
                $controller->getOne($id);
            } else {
                $controller->getAll();
            }
            break;
            
        case 'POST':
            if ($_FILES) {
                $data = array_merge($_POST, ['files' => $_FILES]);
            } else {
                $data = json_decode(file_get_contents('php://input'), true);
            }
            $controller->create($data);
            break;
            
        case 'PUT':
            if (!$id) {
                http_response_code(400);
                echo json_encode(['error' => 'ID is required for update']);
                break;
            }
            
            if ($_FILES) {
                $data = array_merge($_POST, ['files' => $_FILES]);
            } else {
                $data = json_decode(file_get_contents('php://input'), true);
            }
            $controller->update($id, $data);
            break;
            
        case 'DELETE':
            if (!$id) {
                http_response_code(400);
                echo json_encode(['error' => 'ID is required for delete']);
                break;
            }
            $controller->delete($id);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
}

// Function to handle authentication requests
function handleAuthRequest($controller, $uri_parts) {
    $action = $uri_parts[1] ?? '';
    
    switch ($action) {
        case 'login':
            $data = json_decode(file_get_contents('php://input'), true);
            $controller->login($data);
            break;
            
        case 'me':
            $controller->getCurrentUser();
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Auth endpoint not found']);
            break;
    }
}