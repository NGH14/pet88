const express = require('express');

const router = express.Router();

const stripe = require('../services/stripe.js');
const { Order } = require('../models/orders.js');
const { Room } = require('../models/room.js');

router.post('/create-checkout-session', async (req, res) => {
	try {
		const order = await Order.create({
			userID: req.body.userID || 'guest',
			products: req.body.roomList,
			paid: 'processing',
			email: req.body.email,
			price: req.body.price,
			name: req.body.name,
			phone: req.body.phone,
			days: req.body.days,
			confirm: 'unconfimred',
			start: req.body.start,
			end: req.body.end,
			paymentMethod: req.body.paymentMethod,
			service: req.body.service,
		});

		const session = await stripe.checkout.sessions.create({
			customer_email: req.body.email,
			line_items: [
				{
					price_data: {
						currency: 'vnd',
						product_data: {
							description: `${req.body.days} days`,
							name: 'Booking Pet88',
							images: [req.body.photo],
						},
						unit_amount: req.body.price,
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
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/balance', async (req, res) => {
	try {
		const balance = await stripe.balance.retrieve();
		res.json({ balance });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/payment-intent/:id', async (req, res) => {
	try {
		const paymentIntent = await stripe.checkout.search({
			query: `metadata['orderID']: "${req.params.id}"`,
		});
		res.json({ paymentIntent });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
