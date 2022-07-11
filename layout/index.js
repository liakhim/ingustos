console.log('22121212121')
const WooCommerceAPI = require('woocommerce-api');
const WooCommerce = new WooCommerceAPI({
    url: 'http://ingustos',
    consumerKey: 'ck_7a17a4a518bb86eb86f520720f3e9e79fbde9749',
    consumerSecret: 'cs_c38286f1546dde60b2a15105aaa4fc912f5a5f0c',
    wpAPI: true,
    version: 'wc/v1'
});
WooCommerce.getAsync('products').then(function(result) {
    console.log(result.body)
    console.log('complete')
});
