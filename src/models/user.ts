import Roles from './../constants/roles.ts';
import mongoose, { Model, Document } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *         email:
 *           type: string
 *           description: The user's email address.
 *         passwordHash:
 *           type: string
 *           description: The hashed password.
 *         emailVerified:
 *           type: boolean
 *           description: Indicates if the email is verified.
 *         displayName:
 *           type: string
 *           description: The user's display name.
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of photo URLs.
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *           description: User roles.
 *         metadata:
 *           type: object
 *           properties:
 *             lastSignInTime:
 *               type: string
 *               description: The timestamp of the last sign-in.
 *             creationTime:
 *               type: string
 *               description: The timestamp of user creation.
 *             lastRefreshTime:
 *               type: string
 *               description: The timestamp of the last token refresh.
 *         note:
 *           type: string
 *           description: Additional notes about the user.
 *         refreshToken:
 *           type: string
 *           description: User's refresh token.
 */

export interface IUser {
	name: string;
	email: string;
	passwordHash: string;
	emailVerified: boolean;
	displayName: string;
	photos?: string[];
	roles: string[];
	metadata: {
		lastSignInTime?: string;
		creationTime?: string;
		lastRefreshTime?: string;
	};
	note?: string;
	refreshToken?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			require: true,
			minLength: 6,
		},
		emailVerified: {
			type: Boolean,
			required: true,
		},
		displayName: {
			type: String,
			required: true,
		},
		photos: {
			type: [String],
		},
		roles: {
			type: [String],
			required: true,
			default: [Roles.User],
		},
		metadata: {
			lastSignInTime: String,
			creationTime: String,
			lastRefreshTime: String,
		},
		note: {
			type: String,
		},
		refreshToken: {
			type: String,
		},
	},
	{ timestamps: true },
);

const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;
