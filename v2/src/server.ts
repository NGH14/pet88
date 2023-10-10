import swaggerDocs  from './utils/swagger.ts';
import { connectDB } from './db/mongodb.js';
import app from './app.ts';
import logger from '../src/utils/logger.ts';
import { Environment } from './constants/environment.ts';
const PORT: number = Number(process.env.LOCAL_PORT || 5001);
app.listen(PORT, () => {
	connectDB();

	switch (process.env.NODE_ENV) {
		case Environment.Development:
			
			swaggerDocs(app, PORT);
			logger.log({
			level: 'info',
			message: 'Server listening on',
			data: `http://localhost:${PORT}`,
		});
			break;
		case Environment.Testing:
			break;
	
		default:
			break;
	}
});
