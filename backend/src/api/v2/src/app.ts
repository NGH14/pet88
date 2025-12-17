import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import helmet from 'helmet';

import cloudinary from './config/cloudinary.js';
import ErrorHandler from './middleware/error.ts';
import rootRouter from './routes/index.ts';
import corsOptions from './config/cors.ts';

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));
app.use(
	express.urlencoded({
		extended: true,
		limit: '10mb',
		parameterLimit: 50000,
	}),
);
app.use(
	bodyParser.json({
		limit: '50mb',
	}),
);

app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: '50mb',
		parameterLimit: 100000,
	}),
);

// app.use(middleware.decodeToken);


import { auth } from './config/better-auth.ts';
import { toNodeHandler } from 'better-auth/node';

app.all('/api/auth/*', toNodeHandler(auth));
app.use('/api/v2/', rootRouter);

app.use(ErrorHandler);





export default app;
