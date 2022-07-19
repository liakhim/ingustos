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
    'payment_method' => 'bacs',
    'payment_method_title' => 'Direct Bank Transfer',
    'set_paid' => true,
    'billing' => [
        'first_name' => $data['billing']['first_name'],
        'last_name' => $data['billing']['last_name'],
        'address_1' => $data['billing']['address_1'],
        'address_2' => 'address 2',
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
    'line_items' => $data['line_items']
];
if ($data['shipping_lines'][0]['total'] !== 0) {
    $data1['shipping_lines'] = [
        [
            'method_id' => 'flat_rate',
            'method_title' => 'Flat Rate',
            'total' => $data['shipping_lines'][0]['total']
        ]
    ];
}
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
