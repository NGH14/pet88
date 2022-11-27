const express = require('express');

const router = express.Router();

const stripe = require('../middleware/stripe.js');
const { Order } = require('../models/orders.js');
const { Room } = require('../models/room.js');

router.post('/create-checkout-session', async (req, res) => {
	// try {
	// 	const order = await Order.create({
	// 		userID: req.body.userID,
	// 		products: req.body.room,
	// 		paid: 'processing',
	// 		email: req.body.email,
	// 		charge: checkoutPrice,
	// 		roomNumber: req.body.roomList,
	// 	});
	// 	const session = await stripe.checkout.sessions.create({
	// 		customer_email: req.body.email,
	// 		metadata: {
	// 			orderID: order._id.toString(),
	// 		},
	// 		line_items: [
	// 			{
	// 				price_data: {
	// 					currency: 'vnd',
	// 					product_data: {
	// 						description: 'test',
	// 						name: req.body.room.title,
	// 						images: [req.body.photo],
	// 					},
	// 					unit_amount: checkoutPrice,
	// 				},
	// 				quantity: 1,
	// 			},
	// 			{
	// 				price_data: {
	// 					currency: 'vnd',
	// 					product_data: {
	// 						description: 'test',
	// 						name: req.body.room.title,
	// 						images: [req.body.photo],
	// 					},
	// 					unit_amount: checkoutPrice,
	// 				},
	// 				quantity: 1,
	// 			},
	// 		],
	// 		mode: 'payment',
	// 		success_url: `http://localhost:3000/checkout/success/${order._id}`,
	// 		cancel_url: `http://localhost:3000/checkout/cancel/${order._id}`,
	// 		allow_promotion_codes: true,
	// 	});
	// 	res.json({ url: session.url });
	// } catch (err) {
	// 	res.status(500).json(err);
	// }
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

router.post('/find-price', async (req, res) => {
	try {
		const checkoutPrice = 0;
		const roomNumber = await Room.find(
			{
				_id: { $eq: req.body.id },

				'roomNumbers.unavailableDates': { $nin: req.body.dates },
			},
			// { roomNumbers: { $slice: [0, 2] } },
		);

		// const room = roomNumber.slice(0, 2);

		res.json({ room, checkoutPrice });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
