import mongoose, {Document, Types, Schema} from 'mongoose';

export interface IDepartment extends Document {
  _id: Types.ObjectId;
	name: string;
  type: string;
  owner: mongoose.Types.ObjectId;
  city: string;
  address: string;
  photos?: string[];
  services?: string[];
  title: string;
  desc: string;
  rating?: number;
  rooms?: string[];
  grooming?: string[];
  open?: string;
  close?: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the department.
 *         type:
 *           type: string
 *           description: The type of the department.
 *         owner:
 *           type: string
 *           description: The ID of the department owner (User).
 *         city:
 *           type: string
 *           description: The city where the department is located.
 *         address:
 *           type: string
 *           description: The address of the department.
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of photo URLs.
 *         services:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of services provided by the department.
 *         title:
 *           type: string
 *           description: The title of the department.
 *         desc:
 *           type: string
 *           description: The description of the department.
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           description: The rating of the department (between 0 and 5).
 *         rooms:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of room names.
 *         grooming:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of grooming services.
 *         open:
 *           type: string
 *           description: The opening time of the department.
 *         close:
 *           type: string
 *           description: The closing time of the department.
 *       required:
 *         - name
 *         - type
 *         - city
 *         - address
 *         - title
 *         - desc
 */

const DepartmentSchema = new mongoose.Schema<IDepartment>(
	{
		
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

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

const Department = mongoose.model<IDepartment>('Department', DepartmentSchema);

export default Department;
