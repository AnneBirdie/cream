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
function get_bisсuit_all($db){
    //global $db;
    $query = "SELECT * FROM `cakes` WHERE `category` = 'bisсuit'";
    $bisсuit = mysqli_query($db, $query);
    return $bisсuit;
}

$bisсuits = get_bisсuit_all($db);



foreach ($bisсuits as $bisсuit) {
    $a[] = [$bisсuit['name'], $bisсuit['price'], $bisсuit['img'], $bisсuit['composition'], $bisсuit['id']];
    
}
echo json_encode($a);

mysqli_close($db);
