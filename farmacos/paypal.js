const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

const environment = new checkoutNodeJssdk.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_KEY);
const client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

module.exports = { client };
