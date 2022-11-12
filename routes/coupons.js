const express = require('express');

const router = express.Router();

const stripe = require('../middleware/stripe.js');
const { Coupon } = require('../models/coupons.js');

router.post('/', async (req, res) => {
	const coupon = await stripe.coupons.create({
		percent_off: 20,
		duration: 'repeat',
	});

	res.status(200).json(promotionCode);
});

router.get('/', async (req, res) => {
	const coupons = await stripe.coupons.list({});

	res.status(200).json(coupons);
});

module.exports = router;
