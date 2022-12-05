const express = require('express');
const router = express.Router();

const stripe = require('../services/stripe.js');

router.post('/:id', async (req, res) => {
	try {
		const promotionCode = await stripe.promotionCodes.create({
			coupon: req.params.id,
			code: req.body.code,
		});

		res.status(200).json(promotionCode);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/', async (req, res) => {
	try {
		const coupons = await stripe.promotionCodes.list({});
		res.status(200).json(coupons);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/id', async (req, res) => {
	try {
		const coupon = await stripe.promotionCodes.retrieve(req.params.id);
		res.status(200).json(coupon);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/id', async (req, res) => {
	try {
		const coupon = await stripe.promotionCodes.update(
			req.params.id,
			req.body,
		);
		res.status(200).json(coupon);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
