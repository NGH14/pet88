const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
	{
		userID: String,
		products: Object,
		name: String,
		email: String,
		address: String,
		city: String,
		paid: { type: String, defaultValue: 'processing' },
	},
	{ timestamps: true },
);

const Order = mongoose.model('Order', OrderSchema);
module.exports.Order = Order;
