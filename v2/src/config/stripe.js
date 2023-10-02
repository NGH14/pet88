import stripeFactory from 'stripe';
const stripe = stripeFactory(process.env.STRIPE);

export default stripe;
