import mongoose from 'mongoose';
const GroomingSchema = new mongoose.Schema(
	{
		hotelId: {
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
				unavailableDates: { type: [Object] },
			},
		],
	},
	{ timestamps: true },
);

export const Grooming = mongoose.model('Grooming', GroomingSchema);
