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
		phone: String,
		price: Number,
		days: Number,
		paymentMethod: String,
		confirm: String,
		start: String,
		end: String,
		service: String,
	},
	{ timestamps: true },
);

const Order = mongoose.model('Order', OrderSchema);
module.exports.Order = Order;
