import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     departments:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the departments
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 **/

const DepartmentSchema = new mongoose.Schema(
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
		open: String,
		close: String,
	},
	{ timestamps: true },
);

const Department = mongoose.model('Department', DepartmentSchema);

export default Department;


