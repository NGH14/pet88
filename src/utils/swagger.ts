import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import packageJSON from '../../package.json' assert { type: 'json' };
import logger from './logger.ts';

function swaggerDocs(app: Express, PORT: number) {
	const options: swaggerJsdoc.Options = {
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'REST API Docs',
				version: packageJSON.version,
			},
			servers: [
				{
					url: `http://localhost:${PORT}/api/v1`,
					description: 'Development server',
				},
			],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT',
					},
				},
			},
			security: [
				{
					bearerAuth: [],
				},
			],
		},
		apis: ['./src/routes/*.js', './src/routes/*.ts'],
	};

	const swaggerSpec = swaggerJsdoc(options);

	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	app.get('/docs.json', (req: Request, res: Response) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});

	logger.log({
		level: 'info',
		message: 'Docs available at',
		data: `http://localhost:${PORT}/docs`,
	});
}

export default swaggerDocs;
