const mongoose = require('mongoose');
const RoomSchema = new mongoose.Schema(
	{
		hotelID: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		maxPet: {
			type: Number,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		roomNumbers: [
			{
				number: Number,
				unavailableDates: { type: [Date] },
				price: {
					type: Number,
				},
			},
		],
	},
	{ timestamps: true },
);

const Room = mongoose.model('Room', RoomSchema);
module.exports.Room = Room;
