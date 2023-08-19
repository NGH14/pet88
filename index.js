import express from 'express';
import mongoose from 'mongoose';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import middleware from './services/index.js';
import userRoute from './routes/users.js';
import hotelRoute from './routes/hotels.js';
import roomRoute from './routes/rooms.js';
import groomingRoute from './routes/groomings.js';
import checkoutRoute from './routes/checkout.js';
import orderRoute from './routes/orders.js';
import couponRoute from './routes/coupons.js';
import promotionRoute from './routes/promotions.js';

import cloudinary from './services/cloudinary.js';

const PORT = process.env.LOCAL_PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.json({ limit: '10mb', extended: true }));
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
			await mongoose.connect(process.env.MONGO);
			console.log('✅ MongoDB Connected');
		} catch (error) {
			console.log(error);
		}
	};
	connectDB();
	console.log(`✅ Server listening on ${PORT}`);
});

app.get('/api', (req, res) => {
	res.json({ message: 'Hello from server!' });
});

async function createFolder(folderName) {
	try {
		const result = await cloudinary.api.create_folder(folderName);
		cloudinary.uploader.upload(
			'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
			{ public_id: 'test_upload2', folder: folderName },
			(error, result) => {
				if (error) {
					console.error('Error uploading file:', error);
				} else {
					console.log('File uploaded successfully:');
				}
			},
		);
		console.log('Folder created:', result);
	} catch (error) {
		console.error('Error creating folder:', error);
	}
}

// Call the function to create a folder
createFolder('test2');

app.use('/api/user', userRoute);
app.use('/api/hotel', hotelRoute);
app.use('/api/hotel-room', roomRoute);
app.use('/api/grooming', groomingRoute);
app.use('/api/checkout', checkoutRoute);
app.use('/api/order', orderRoute);
app.use('/api/coupon', couponRoute);
app.use('/api/promotion', promotionRoute);
