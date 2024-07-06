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
function get_dessert_all(){
    global $db;
    $query = "SELECT * FROM cakes WHERE category = 'dessert'";
    $dessert = mysqli_query($db, $query);
    return $dessert;
}

$desserts = get_dessert_all();



foreach ($desserts as $dessert) {
    $a[] = [$dessert['name'], $dessert['price'], $dessert['img'], $dessert['composition'], $dessert['id']];
    
}
echo json_encode($a);

mysqli_close($db);
