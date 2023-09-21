import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import cloudinary from './config/cloudinary.js';
import './config/firebase.js';
import ErrorHandler from './middleware/error.ts';
import rootRouter from './routes/index.ts';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));
app.use(
	express.urlencoded({
		limit: '10mb',
		extended: true,
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
		limit: '50mb',
		parameterLimit: 100000,
		extended: true,
	}),
);

// app.use(middleware.decodeToken);

app.use('/api/v1/', rootRouter);
app.use(ErrorHandler);

export default app;
