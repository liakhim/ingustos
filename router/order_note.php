<?php
require __DIR__ . '/vendor/autoload.php';

use Automattic\WooCommerce\Client;
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);
$woocommerce = new Client(
    'http://ingustos/wp',
    'ck_19d1708a280b226b07138e2ab9a62e5a2920e697',
    'cs_de3b4b17b2bccb83cc75a5acc98479837f646ccc',
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
