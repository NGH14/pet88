import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
	{
		userID: String,
		eventID: String,
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

export const Order = mongoose.model('Order', OrderSchema);
export const GetAllOrder = () => Order.find();
