require('dotenv').config('');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');

const middleware = require('./services/index');
const userRoute = require('./routes/users');
const hotelRoute = require('./routes/hotels');
const roomRoute = require('./routes/rooms');
const groomingRoute = require('./routes/groomings');

const checkoutRoute = require('./routes/checkout');
const orderRoute = require('./routes/orders');
const couponRoute = require('./routes/coupons');
const promotionRoute = require('./routes/promotions');

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

const PORT = process.env.LOCAL_PORT || 5000;

mongoose.connection.on('disconnected', () => {
	console.log('MongoDB disconnected!');
});

app.listen(PORT, () => {
	const connectdb = async () => {
		try {
			await mongoose.connect(process.env.MONGO);
			console.log('MongoDB Connected');
		} catch (error) {
			console.log(error);
		}
	};
	connectdb();
	console.log(`Server listening on ${PORT}`);
});

app.get('/api', (req, res) => {
	res.json({ message: 'Hello from server!' });
});

app.use('/api/user', userRoute);
app.use('/api/hotel', hotelRoute);
app.use('/api/hotel-room', roomRoute);
app.use('/api/grooming', groomingRoute);
app.use('/api/checkout', checkoutRoute);
app.use('/api/order', orderRoute);
app.use('/api/coupon', couponRoute);
app.use('/api/promotion', promotionRoute);
