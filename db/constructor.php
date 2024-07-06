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
function get_layers_all($db){
    //global $db;
    $query = "SELECT * FROM `layer`";
    $layers = mysqli_query($db, $query);
    return $layers;
}

$layers = get_layers_all($db);

foreach ($layers as $layer) {
    $a[] = [$layer['type'], $layer['name'], $layer['price'], $layer['weight'], $layer['svgPath'], $layer['id']];    
}
echo json_encode($a);

mysqli_close($db);

