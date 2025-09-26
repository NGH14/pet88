import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as packageJSON from '../../package.json' with { type: 'json' };

import logger from './logger.ts';

function swaggerDocs(app: Express, PORT: number) {
	const options: swaggerJsdoc.Options = {
		definition: {
			openapi: '3.0.1',
			info: {
				title: 'Pet88 REST API Docs',
				version: packageJSON.version,
			},
			servers: [
				{
					url: `http://localhost:${PORT}/api/v2`,
					description: 'Development server',
				},
			],

			explorer: true,
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
		apis: ['./src/routes/*.js', './src/routes/*.ts','./src/models/*.ts'],
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
