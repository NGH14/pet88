import mongoose, { ConnectOptions } from 'mongoose';
import logger from '../utils/logger.ts';
import { Environment } from '../constant/environment.ts';
import { LogLevel } from '../constant/log.js';

export const connectDB = async () => {
	try {
		const dbOptions: ConnectOptions = {
      dbName: process.env.DB,
    };

    await mongoose.connect(process.env.MONGO, dbOptions);

		if (process.env.NODE_ENV !== Environment.TESTING) {
			logger.log({ level: LogLevel.INFO, message: 'MongoDB Connected' });
		}
	} catch (error) {
		logger.log({
			level: 'error',
			message: error,
		});
	}
};
