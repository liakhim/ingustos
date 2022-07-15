<?php
require __DIR__ . '/vendor/autoload.php';

use Automattic\WooCommerce\Client;

$woocommerce = new Client(
    'http://ingustos/wp',
    'ck_19d1708a280b226b07138e2ab9a62e5a2920e697',
    'cs_de3b4b17b2bccb83cc75a5acc98479837f646ccc',
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
