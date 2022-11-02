require('dotenv').config('');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');

const middleware = require('./middleware/index');
const userRoute = require('./routes/users');
const hotelRoute = require('./routes/hotels');
const roomRoute = require('./routes/rooms');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

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
