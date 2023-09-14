import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		mongoose.connect(process.env.MONGO, { dbName: process.env.DB });
	} catch (error) {
		console.log(error);
	}
};

mongoose.connection.on('disconnected', () => {
	console.log('MongoDB Disconnected');
});
