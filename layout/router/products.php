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
$products = $woocommerce->get('products');
$finalProducts = [];
foreach ($products as $product) {
    foreach ($product->variations as $variation_id) {
        $variation = $woocommerce->get('products/30/variations/'.$variation_id);
        if (count($variation->attributes)) {
            $product->vars[] = $variation;
        }
    }
    $finalProducts[] = $product;
}
header("Content-Type: application/json");
echo json_encode($finalProducts);
// exit();
?>
