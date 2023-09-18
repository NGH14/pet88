import express from 'express';
const router = express.Router();

import stripe from '../config/stripe.js';

router.post('/:id', async (req, res) => {
	try {
		const promotionCode = await stripe.promotionCodes.create({
			coupon: req.params.id,
			code: req.body.code,
		});

		res.status(200).json(promotionCode);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/', async (req, res) => {
	try {
		const coupons = await stripe.promotionCodes.list({});
		res.status(200).json(coupons);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/id', async (req, res) => {
	try {
		const coupon = await stripe.promotionCodes.retrieve(req.params.id);
		res.status(200).json(coupon);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/id', async (req, res) => {
	try {
		const coupon = await stripe.promotionCodes.update(req.params.id, req.body);
		res.status(200).json(coupon);
	} catch (error) {
		res.status(500).json(error);
	}
});

export default router;
