const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema(
	{
		_id: String,
		created: Date,
		currency: String,
		duration: String,
		duration_in_months: String,
		max_redemptions: Number,
		name: String,
		percent_off: String,
		redeem_by: Date,
		times_redeemed: Number,
		valid: Boolean,
	},
	{ timestamps: true },
);

const Coupon = mongoose.model('Coupon', CouponSchema);
module.exports.Coupon = Coupon;
