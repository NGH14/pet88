import express from 'express';

const router = express.Router();

import stripe from '../config/stripe.js';
import { Coupon } from '../models/coupons.js';

router.post('/', async (req, res) => {
	try {
		const coupon = await stripe.coupons.create({
			percent_off: 20,
			duration: 'repeat',
		});
		res.status(200).json(promotionCode);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/', async (req, res) => {
	try {
		const coupons = await stripe.coupons.list({});

		res.status(200).json(coupons);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const coupon = await stripe.coupons.retrieve(req.params.id);

		res.status(200).json(coupon);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const coupon = await stripe.coupons.update(req.params.id, {
			metadata: { order_id: '6735' },
		});
		res.status(200).json(coupon);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await stripe.coupons.del(req.params.id);
		res.status(200).json('Delete Successful');
	} catch (err) {
		res.status(500).json(err);
	}
});

export default router;
