<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Storely
 */

get_header();
?>
<div id="post-section" style="border: 1px solid red" class="post-section st-py-full">
    <?php
    // Install:
    // composer require automattic/woocommerce

    // Setup:
    require __DIR__ . '/vendor/autoload.php';

    use Automattic\WooCommerce\Client;

    $woocommerce = new Client(
        'http://example.com', // Your store URL
        'consumer_key', // Your consumer key
        'consumer_secret', // Your consumer secret
        [
            'wp_api' => true, // Enable the WP REST API integration
            'version' => 'wc/v3' // WooCommerce WP REST API version
        ]
    );
    echo 'qweqweqweqwe';
    ?>
</div>
<?php get_footer(); ?>
