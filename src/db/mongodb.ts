import mongoose, { ConnectOptions } from 'mongoose';
import logger from '../utils/logger.ts';

export const connectDB = async () => {
	try {
		const dbOptions: ConnectOptions = {
      dbName: process.env.DB,
    };

    await mongoose.connect(process.env.MONGO, dbOptions);

		if (process.env.NODE_ENV !== 'test') {
			logger.log({ level: 'info', message: 'MongoDB Connected' });
		}
	} catch (error) {
		logger.log({
			level: 'error',
			message: error,
		});
	}
};
