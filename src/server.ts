import { connectDB } from './db/mongodb.js';

import app from './app.ts';
import logger from '../src/utils/logger.ts';
import swaggerDocs from '../src/utils/swagger.ts';
const PORT: number = Number(process.env.LOCAL_PORT || 5001);

app.listen(PORT, () => {
	connectDB();
	if (process.env.NODE_ENV == 'development') swaggerDocs(app, PORT);
	if (process.env.NODE_ENV !== 'test') {
		logger.log({
			level: 'info',
			message: 'Server listening on',
			data: `http://localhost:${PORT}`,
		});
	}
});
