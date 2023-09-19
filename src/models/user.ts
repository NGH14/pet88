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
			unique: true,
		},
		passwordHash: {
			type:String,
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
		metadata: {
      lastSignInTime: String,
      creationTime: String,
      lastRefreshTime: String
		},
    note: {
      type: String,
    },
		refreshToken: {
			type: String,
		}
	},
	{ timestamps: true },
);

 const User = mongoose.model('User', UserSchema);
 export default User;