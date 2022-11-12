const express = require('express');

const router = express.Router();

const stripe = require('../middleware/stripe.js');
const { Order } = require('../models/orders.js');

router.post('/create-checkout-session', async (req, res) => {
	// res.json(req.body.photo);
	const checkoutPrice = req.body.room.price * req.body.days;

	const order = await Order.create({
		userID: req.body.userID,
		products: req.body.room,
		paid: 'processing',
		email: req.body.email,
		charge: checkoutPrice,
	});

	const session = await stripe.checkout.sessions.create({
		customer_email: req.body.email,
		metadata: {
			orderID: order._id.toString(),
		},
		line_items: [
			{
				price_data: {
					currency: 'vnd',
					product_data: {
						description: 'test',
						name: req.body.room.title,
						images: [req.body.photo],
					},
					unit_amount: checkoutPrice,
				},
				quantity: 1,
			},
		],
		mode: 'payment',
		success_url: `http://localhost:3000/checkout/success/${order._id}`,
		cancel_url: `http://localhost:3000/checkout/cancel/${order._id}`,
		allow_promotion_codes: true,
	});
	res.json({ url: session.url });
});

router.get('/balance', async (req, res) => {
	const balance = await stripe.balance.retrieve();
	res.json({ balance });
});

router.get('/payment-intent/:id', async (req, res) => {
	const paymentIntent = await stripe.checkout.search({
		query: `metadata['orderID']: "${req.params.id}"`,
	});
	res.json({ paymentIntent });
});

module.exports = router;
