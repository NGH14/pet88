import mongoose from 'mongoose';
const RoomSchema = new mongoose.Schema(
	{
		departmentId: {
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

export const Room = mongoose.model('Room', RoomSchema);
