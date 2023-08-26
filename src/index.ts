
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import sharp from 'sharp';
import cloudinary from './config/cloudinary.js';
import checkoutRoute from './routes/checkout.js';
import couponRoute from './routes/coupons.js';
import groomingRoute from './routes/groomings.js';
import hotelRoute from './routes/hotels.js';
import orderRoute from './routes/orders.js';
import promotionRoute from './routes/promotions.js';
import roomRoute from './routes/rooms.js';
import './config/firebase.js';

import userRoute from './routes/users.js';


const app = express();
const PORT:number = Number(process.env.LOCAL_PORT || 5001);

app.use(cors());
app.use(express.json());
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

mongoose.connection.on('disconnected', () => {
	console.log('MongoDB disconnected!');
});

app.listen(PORT, () => {
	const connectDB = async () => {
		try {
			mongoose.connect(process?.env?.MONGO || "");
			console.log('✅ MongoDB Connected');
		} catch (error) {
			console.log(error);
		}
	};
	connectDB();
	console.log(`✅ Server listening on ${PORT}`);
});

app.get('/api', (_, res) => {
	res.json({ message: 'Hello from server!' });
});

let upload = multer();

app.post('/test-image', upload.single('image'), async (req, res) => {
	const data = await sharp(req?.file?.buffer).webp().toBuffer();
	const folder = await cloudinary.api.create_folder('test3');
	cloudinary.uploader
		.upload_stream(
			{ public_id: 'test_upload2', folder: folder?.name },
			(error) => {
				if (error) {
					res.status(500).send(error);
				} else {
					res.json('File uploaded successfully:');
				}
			},
		)
		.end(data);
});

// app.use('/', router());

app.use('/api/user', userRoute);
app.use('/api/hotel', hotelRoute);
app.use('/api/hotel-room', roomRoute);
app.use('/api/grooming', groomingRoute);
app.use('/api/checkout', checkoutRoute);
app.use('/api/order', orderRoute);
app.use('/api/coupon', couponRoute);
app.use('/api/promotion', promotionRoute);
