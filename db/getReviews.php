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
function get_reviews_all(){
    global $db;
    $query = "SELECT * FROM reviews";
    $reviews = mysqli_query($db, $query);
    return $reviews;
}

$reviews = get_reviews_all();



foreach ($reviews as $review) {
    $a[] = [$review['id'], $review['reviewText'], $review['reviewImg']];
    
}
echo json_encode($a);

mysqli_close($db);