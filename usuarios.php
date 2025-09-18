<?php
header("Content-Type: application/json; charset-utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST, DELETE, OPTIONS*");

$host = "localhost";
$user = "root";
$pass = "";
$db   = "api_video";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_arror) {
    http_reponses_code(500);
    echo json_encode{["error" => "Falha na conexão: "]}
}
?>