import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import helmet from 'helmet';
import { clerkClient, clerkMiddleware, getAuth } from '@clerk/express'

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

app.use('/api/v2/', rootRouter);
app.use(ErrorHandler);

app.use(clerkMiddleware());

app.get('/protect-auth', async (req, res) => {
	// Use `getAuth()` to access `isAuthenticated` and the user's ID
	const { isAuthenticated, userId } = getAuth(req)

	// If user isn't authenticated, return a 401 error
	if (!isAuthenticated) {
		return res.status(401).json({ error: 'User not authenticated' })
	}

	// Use `clerkClient` to access Clerk's JS Backend SDK methods
	// and get the user's User object
	const user = await clerkClient.users.getUser(userId)

	res.json(user)
})


export default app;
