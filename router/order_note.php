<?php
require __DIR__ . '/vendor/autoload.php';

use Automattic\WooCommerce\Client;
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);
$woocommerce = new Client(
    'http://ingustos/wp',
    'ck_49f30f3d18b3c535862f892b78ed4e58045f153a',
    'cs_599361e58c888ef761404b3b42d0ed40f9ff5e7a',
    [
        'wp_api' => true,
        'version' => 'wc/v3'
    ]
);
$data1 = [
    'note' => $data['note']
];
try {
    $answer = $woocommerce->post('orders/'. $data['id'] .'/notes', $data1);
    header("Content-Type: application/json");
    echo json_encode((array)$answer);
} catch (Exception $e) {
    var_dump(http_response_code(400));
    echo 'Выброшено исключение: ',  $e->getMessage(), "\n";
}
//header("Content-Type: application/json");
//echo json_encode($woocommerce->post('orders', $data));
// print_r($woocommerce->post('orders', $data));
?>
