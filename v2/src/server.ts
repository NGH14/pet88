import swaggerDocs from './utils/swagger.ts';
import { connectDB } from './db/mongodb.js';
import app from './app.ts';
import logger from '../src/utils/logger.ts';
import { Environment } from './constants/environment.ts';
import { LogLevel } from './constants/log.ts';
import { SERVER_PORT, serverListeningMessage } from './constants/app.ts';


app.listen(SERVER_PORT, () => {
	connectDB();

	switch (process.env.NODE_ENV) {
		case Environment.DEVELOPMENT:
			swaggerDocs(app, SERVER_PORT);

			logger.log({
				level: LogLevel.INFO,
				message: serverListeningMessage,
				data: `http://localhost:${SERVER_PORT}`,
			});
			break;
		case Environment.TESTING:
			break;

		default:
			break;
	}
});
