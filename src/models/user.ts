import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		emailVerified: {
			type: String,
			required: true,
		},
		displayName: {
			type: String,
			required: true,
		},
		photos: {
			type: [String],
		},
		metadata: {
      lastSignInTime: String,
      creationTime: String,
      lastRefreshTime: String
		},
    note: {
      type: String,
    }
	},
	{ timestamps: true },
);

export const User = mongoose.model('User', UserSchema);