<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Получаем JSON из тела запроса
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Логируем данные (для отладки)
file_put_contents('form_data.log', date('Y-m-d H:i:s') . ': ' . $json . "\n", FILE_APPEND);

// Отправляем ответ
echo json_encode(['status' => 'success', 'message' => 'Form submitted']);
?>