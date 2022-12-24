const mongoose = require('mongoose');
const HotelSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		photos: {
			type: [String],
		},
		services: {
			type: [String],
		},
		title: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			min: 0,
			max: 5,
		},
		rooms: {
			type: [String],
		},
		grooming: {
			type: [String],
		},
		featured: {
			type: Boolean,
			default: false,
		},
		open: String,
		close: String,
	},
	{ timestamps: true },
);

const Hotel = mongoose.model('Hotel', HotelSchema);
module.exports.Hotel = Hotel;
