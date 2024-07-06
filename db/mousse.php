<?php

$dbhost = "creamDomen";
$dbname = "cream";
$username = "root";
$password = "";


$db = mysqli_connect($dbhost, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    printf("Не удалось подключиться: %s\n", mysqli_connect_error());
    exit();
}
function get_mousses_all(){
    global $db;
    $query = "SELECT * FROM cakes WHERE category = 'mousse'";
    $mousse = mysqli_query($db, $query);
    return $mousse;
}

$mousses = get_mousses_all();



foreach ($mousses as $mousse) {
    $a[] = [$mousse['name'], $mousse['price'], $mousse['img'], $mousse['composition'], $mousse['id']];
    
}
echo json_encode($a);

mysqli_close($db);