const express = require('express');

const router = express.Router();

const { Order } = require('../models/orders.js');

router.get('/', async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/user/:id', async (req, res) => {
	try {
		const orders = await Order.find({ userID: req.params.id });
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.id);
		res.status(200).json('Order has been deleted.');
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/success/:id', async (req, res) => {
	try {
		const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
			paid: 'success',
		});
		res.status(200).json(updateOrder);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/cancel/:id', async (req, res) => {
	try {
		const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
			paid: 'success',
		});
		res.status(200).json(updateOrder);
	} catch (err) {
		res.status(500).json(err);
	}
});

// if (type === 'success') {
// 	await Order.findByIdAndUpdate(order._id, { paid: 1 });
// }
// if (type === 'cancel') {
// 	await Order.findByIdAndDelete(order._id);
// }

module.exports = router;
