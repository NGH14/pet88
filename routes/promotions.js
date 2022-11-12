const express = require('express');
const router = express.Router();

const stripe = require('../middleware/stripe.js');

router.post('/', async (req, res) => {
	const promotionCode = await stripe.promotionCodes.create({
		coupon: coupon.id,
		code: 'TEST88',
	});

	res.status(200).json(promotionCode);
});

router.get('/', async (req, res) => {
	const coupons = await stripe.promotionCodes.list({});

	res.status(200).json(coupons);
});

module.exports = router;
