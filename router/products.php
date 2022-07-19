<?php
require __DIR__ . '/vendor/autoload.php';

use Automattic\WooCommerce\Client;

$woocommerce = new Client(
    'http://ingustos/wp',
    'ck_49f30f3d18b3c535862f892b78ed4e58045f153a',
    'cs_599361e58c888ef761404b3b42d0ed40f9ff5e7a',
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
