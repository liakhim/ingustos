<?php
require __DIR__ . '/vendor/autoload.php';

use Automattic\WooCommerce\Client;

$woocommerce = new Client(
    'http://ingustos',
    'ck_7a17a4a518bb86eb86f520720f3e9e79fbde9749',
    'cs_c38286f1546dde60b2a15105aaa4fc912f5a5f0c',
    [
        'wp_api' => true,
        'version' => 'wc/v3'
    ]
);
header("Content-Type: application/json");
echo json_encode($woocommerce->get('products'));
// exit();
?>
