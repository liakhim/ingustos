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
    'payment_method' => 'bacs',
    'payment_method_title' => 'Direct Bank Transfer',
    'set_paid' => true,
    'billing' => [
        'first_name' => $data['billing']['first_name'],
        'last_name' => $data['billing']['last_name'],
        'address_1' => $data['billing']['address_1'],
        'address_2' => '',
        'city' => $data['billing']['city'],
        'state' => $data['billing']['state'],
        'postcode' => $data['billing']['postcode'],
        'country' => 'RU',
        'email' => $data['billing']['email'],
        'phone' => $data['billing']['phone']
    ],
    'shipping' => [
        'first_name' => $data['shipping']['first_name'],
        'last_name' => $data['shipping']['last_name'],
        'address_1' => $data['shipping']['address_1'],
        'address_2' => '',
        'city' => $data['shipping']['city'],
        'state' => $data['shipping']['state'],
        'postcode' => $data['shipping']['postcode'],
        'country' => 'RU'
    ],
    'line_items' => $data['line_items'],
    'shipping_lines' => [
        [
            'method_id' => 'flat_rate',
            'method_title' => 'Flat Rate',
            'total' => '400.00'
        ]
    ]
];
try {
    $answer = $woocommerce->post('orders', $data1);
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
