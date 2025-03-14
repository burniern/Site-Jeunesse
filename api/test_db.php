<?php
$host = 'localhost';
$dbname = 'jeunesse_biere';
$user = 'root'; // Remplace si tu as un autre utilisateur
$pass = ''; // Remplace si tu as un mot de passe

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo json_encode(["success" => "Connexion réussie à la base de données"]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur de connexion : " . $e->getMessage()]);
}
?>
