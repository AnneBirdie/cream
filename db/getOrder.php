<?php
$post_data = json_decode(file_get_contents('php://input'), true);
extract($post_data);

$name = urldecode($name);
$name = htmlspecialchars($name);
$phone = htmlspecialchars($phone);
$phone = urldecode($phone);

mail("repetitorChi@gmail.ru", "Заявка с сайта", "Имя:".$name.". Номер: ".$phone ,"From: ptichka.priem@yandex.ru \r\n");
if (isset($name) && isset($phone)) {
    $answer = "ok";
 
    echo json_encode($answer);
} else {
    echo json_encode("error");
}

