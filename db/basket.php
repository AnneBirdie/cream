<?php 
$post_data = json_decode(file_get_contents('php://input'), true);
$sale_3 = 0;
$sale_5 = 0;
if (date("d") == "03"){
    $sale = 3;
}

$totalPrice = 0;


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


for ($i = 0; $i < count($post_data); $i++) {
    if (isset($post_data[$i]["authorCake"])){

        $weight = 0;
        $price = 0;
        $layersNames = "";
    
        $layersCurrent = $post_data[$i]["authorCake"] ;
       
        for ($j = 0; $j < count($layersCurrent); $j++) {
            foreach ($layers as $layer){
                
                if ($layer['id'] == $layersCurrent[$j]){
                    $weight += $layer['weight'] * $post_data[$i]["diameter"];
                    $price += ($layer['price'] * $post_data[$i]["diameter"]);
                    $layersNames .= $layer['name'] . " ";
                    $ids[] = $layer['id'];
                }
            }
        }
        $price .= " ₽";
        $weight .= ' грамм';
        $res[$i] = ["Авторский торт" . " : " .$layersNames, $price, $weight, $ids, "authorCake", $post_data[$i]["diameter"]];
        $totalPrice += $price;
               
    }else if (isset($post_data[$i]["cake"])){

        foreach ($cakes as $cake) {

                if ($cake['id'] == $post_data[$i]['cake']){
                    $totalPrice += ($cake['price'] * $post_data[$i]["count"]);
                    if ($cake['category'] == "biscuit"){
                        $weight =  $post_data[$i]["count"]*1000;
                        $weight .= ' г';
                    }else{
                        $weight =  $post_data[$i]["count"];
                        $weight .= ' шт';
                    }
                    $price = $cake['price'] * $post_data[$i]["count"];
                    $price .= " ₽";
                    $res[$i] = [$cake['name'], $price, $weight, $cake['id'], $cake['category'], $post_data[$i]["count"]];
                    /*if ($cake['category'] == "bisсuit" || $cake['category'] == "mousse"){
                        $sale = 5;
                    }*/
                }
        
            
        }
    }
}
/*
if ($sale_3 > $sale_5){
    $res[] = $totalPrice-($totalPrice/100*$sale_3);
    $res[] = $sale_3;
}else if($sale_5 > $sale_3){
    $res[] = $totalPrice-($totalPrice/100*$sale_5);
    $res[] = $sale_5;
}else{
    
    $res[] = 0;
}*/










$res = json_encode($res);
echo $res;
mysqli_close($db);


//Header("Location:basket.php?get=$totalPrice");
$res = array();
$totalPrice = 0;
