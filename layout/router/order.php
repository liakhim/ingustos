<?php
require __DIR__ . '/vendor/autoload.php';

use Automattic\WooCommerce\Client;

$woocommerce = new Client(
    'http://ingustos',
    'ck_541ff9aac68cb09cc2d250ac08c2f62087c645fe',
    'cs_7f0cebad24586f676ab37db179db40f1549ceffe',
    [
        'wp_api' => true,
        'version' => 'wc/v3'
    ]
);
$data = [
    'line_items' => [
        [
            'product_id' => 21,
            'quantity' => 1
        ]
    ]
];
$woocommerce->post('orders', $data);
//header("Content-Type: application/json");
//echo json_encode($woocommerce->post('orders', $data));
// print_r($woocommerce->post('orders', $data));
?>
