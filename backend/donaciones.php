<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once "config.php";

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {

    case "GET":
        $sql = "SELECT * FROM donadores";
        $result = $conn->query($sql);
        $data = [];

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode(["data" => $data]);
        break;

    case "POST":
        $body = json_decode(file_get_contents("php://input"), true);

        $stmt = $conn->prepare(
            "INSERT INTO donadores (nombre_completo, direccion, telefono, tipo_donacion) VALUES (?, ?, ?, ?)"
        );
        $stmt->bind_param("ssss",
            $body["nombre_completo"],
            $body["direccion"],
            $body["telefono"],
            $body["tipo_donacion"]
        );
        $stmt->execute();

        echo json_encode(["message" => "Agregado"]);
        break;

    case "PUT":
        parse_str($_SERVER["QUERY_STRING"], $query);
        $id = $query["id"] ?? null;

        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "Falta id"]);
            exit;
        }

        $body = json_decode(file_get_contents("php://input"), true);

        $stmt = $conn->prepare(
            "UPDATE donadores SET nombre_completo=?, direccion=?, telefono=?, tipo_donacion=? WHERE id_donador=?"
        );
        $stmt->bind_param("ssssi",
            $body["nombre_completo"],
            $body["direccion"],
            $body["telefono"],
            $body["tipo_donacion"],
            $id
        );
        $stmt->execute();

        echo json_encode(["message" => "Actualizado"]);
        break;

    case "DELETE":
        parse_str($_SERVER["QUERY_STRING"], $query);
        $id = $query["id"] ?? null;

        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "Falta id"]);
            exit;
        }

        $stmt = $conn->prepare("DELETE FROM donadores WHERE id_donador=?");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        echo json_encode(["message" => "Eliminado"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}
