<?php 
$post_data = json_decode(file_get_contents('php://input'), true);


if (date('d') == 03){
    $sale_3 = 3;
}else{
    $sale_3 = 0;
}
$saleAmount = 0;
$totalPrice = 0;
$sale_5 = 0;
$checkSale = false;
$length = count($post_data);
for ($i = 0; $i < $length; $i++) {
    if ($post_data[$i]["category"] === 'mousse' || $post_data[$i]["category"] === 'bisсuit' || $post_data[$i]["category"] === 'authorCake'){
        $checkSale = true;
    }
}

$dbhost = "creamDomen";
$dbname = "cream";
$username = "root";
$password = "";
$db = mysqli_connect($dbhost, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    printf("Не удалось подключиться: %s\n", mysqli_connect_error());
    exit();
}

$queryLayers = "SELECT * FROM `layer`";
$layers = mysqli_query($db, $queryLayers);

$queryCakes = "SELECT * FROM `cakes`";
$cakes = mysqli_query($db, $queryCakes);


for ($i = 0; $i < $length; $i++) {
    if ($post_data[$i]["category"] === 'authorCake'){
    
        $layersCurrent = $post_data[$i]["id"];
        $lengthLayersCurrent = count($layersCurrent);
        for ($j = 0; $j < $lengthLayersCurrent; $j++) {
            foreach ($layers as $layer){
                
                if ($layer['id'] == $layersCurrent[$j]){
                    $totalPrice += $layer['price']*$post_data[$i]["target"];
                }
            }
        }
               
    }else if ($post_data[$i]["category"] == 'dessert' || $post_data[$i]["category"] == 'bisсuit' || $post_data[$i]["category"] == 'mousse'){
        foreach ($cakes as $cake) {
            if ($cake["id"]===$post_data[$i]["id"]){
                if ($post_data[$i]["category"] == 'dessert' && $checkSale){
                    $sale_5 = 5;
                    $saleAmount += $cake['price']*$post_data[$i]['target'] / 100 * $sale_5;
                    $totalPrice += $cake['price']*$post_data[$i]['target'] - $saleAmount;
                }else{
                    $totalPrice += $cake['price']*$post_data[$i]['target'];
                }
                
            }   
        }
    }
}

if ($sale_3 > $sale_5){
    $res[] = $totalPrice-($totalPrice/100*$sale_3);
    $res[] = $sale_3;
    $res[] = $totalPrice/100*$sale_3;
}else if($sale_5 > $sale_3){
    $res[] = $totalPrice;
    $res[] = $sale_5;
    $res[] = $saleAmount;
}else{ 
    $res[] = $totalPrice;
    $res[] = 0;
    $res[] = 0;
}










$res = json_encode($res);
echo $res;
mysqli_close($db);


//Header("Location:basket.php?get=$totalPrice");
$res = array();
$totalPrice = 0;
