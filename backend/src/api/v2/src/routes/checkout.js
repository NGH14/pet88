import express from 'express';
import stripe from '../config/stripe.js';
import { Order } from '../models/order.js';
import { concurrency_VIETNAMESE } from '../constant/concurrency.js';

const router = express.Router();
const orderURL = process.env.CLIENT_URL + '/checkout';

router.post('/create-checkout-session', async (req, res) => {
	try {
		const order = await Order.create({
			userID: req.body.userID || 'guest',
			eventID: req.body.eventID || '-1',
			products: req.body.roomList,
			paid: 'processing',
			email: req.body.email,
			price: req.body.price,
			name: req.body.name,
			phone: req.body.phone,
			days: req.body.days,
			confirm: 'unconfirmed',
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
						currency: concurrency_VIETNAMESE,
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
			success_url: `${orderURL}/success/${order._id}`,
			cancel_url: `${orderURL}/cancel/${order._id}`,
		});

		res.json({ url: session.url });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/balance', async (req, res) => {
	try {
		const balance = await stripe.balance.retrieve();
		res.json({ balance });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/payment-intent/:id', async (req, res) => {
	try {
		const paymentIntent = await stripe.checkout.search({
			query: `metadata['orderID']: "${req.params.id}"`,
		});
		res.json({ paymentIntent });
	} catch (error) {
		res.status(500).json(error);
	}
});

export default router;
