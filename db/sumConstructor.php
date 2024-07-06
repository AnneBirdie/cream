<?php
$post_data = json_decode(file_get_contents('php://input'), true);

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
    $query = "SELECT * FROM `layer`";
    $layers = mysqli_query($db, $query);
    return $layers;
}

$layers = get_layers_all($db);
$res;
$length = count($post_data)-1;
$totalPrice = 0;
$totalWeight = 0;
foreach ($layers as $layer) {
    for ($i = 0; $i < $length; $i++){
        if ($layer['id'] === $post_data[$i]){
            $res[$i]["price"] = $layer['price']*$post_data[$length];
            $res[$i]["weight"] = $layer['weight']*$post_data[$length];
            $totalPrice += $res[$i]["price"];
            $totalWeight += $res[$i]["weight"];
        }
    }
}
$res['totalPrice']=$totalPrice;
$res['totalWeight']=$totalWeight;
$res = json_encode($res);
echo $res;
mysqli_close($db);

$res = array();
$totalPrice = 0;
$totalWeight = 0;