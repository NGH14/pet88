import mongoose from 'mongoose';
import logger from '../utils/logger.ts';

export const connectDB = async () => {
	try {
		mongoose.connect(process.env.MONGO, { dbName: process.env.DB });
		if (process.env.NODE_ENV !== 'test')
			logger.log({ level: 'info', message: 'MongoDB Connected' });
	} catch (error) {
		logger.log({
			level: 'error',
			message: error,
		});
	}
};
mongoose.connection.on('disconnected', () => {
	logger.log({ level: 'info', message: 'MongoDB Disconnected' });
});
