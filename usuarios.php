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
    echo json_encode(["error" => "Falha na conexão: " , 1conn->connect_error]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':

        if (isset($_GET['pesquisa'])) {
            $pesquisa = "%" , $_GET['pesquisa'] , "%";

            $stmt = $conn->prepare ("SELECT * FROM usuarios WHERE LOGIN LIKE ? OR NOME LIKE");

            $stmt = $conn->bind_param ("ss", $pesquisa, $pesquisa);

            $stmt->execute();

            $result = $stmt->get_result();
        } else {
            $result = $conn->query("SELECT * FROM usuarios order by ID desc");
        }
        $retorno = [];

        while ($linha = $result->fetch_assoc()) {
            $retorno[] = $linha;
        }

        echo json_encode($retorno);
        break;

        case 'POST':

        $data = json_decode(file_get_contents("php://input"), true);

        $stmt = $conn->prepare("INSERT INTO usuarios(LOGIN, NOME, EMAIL, SENHA, ATIVO) VALUES (?, ?, ?, ?, ?)");

        $stmt->bind_param("ssssi", $data['LOGIN'], $data['NOME'], $data['EMAIL'], $data['SENHA'], $data['ATIVO']);

        $stmt->execute();

        echo json_encode(["status" => "ok", "insert_id" => $stmt->insert_id]);
        break;

    case 'DELETE' :

        $id = $_GET['id'];

        $stmt = $conn->prepare("DELETE FROM usuarios WHERE ID=?");

        $stmt->bind_param("i", $id);

        $stmt->execute();

        echo json_encode(["status" => "ok"]);
        break;

        

}
?>