import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		mongoose.connect(process.env.MONGO, { dbName: process.env.DB });
		console.log('✅ MongoDB Connected');
	} catch (error) {
		console.log(error);
	}
};
