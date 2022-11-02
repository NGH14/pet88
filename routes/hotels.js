const express = require('express');

const router = express.Router();
const { Hotel } = require('../models/hotel.js');

router.post('/', async (req, res) => {
	const newHotel = new Hotel(req.body);

	try {
		const savedHotel = await newHotel.save();
		res.status(200).json(savedHotel);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updatedHotel = await Hotel.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true },
		);
		res.status(200).json(updatedHotel);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Hotel.findByIdAndDelete(req.params.id);
		res.status(200).json('Hotel has been deleted.');
		res.status(200).json(updatedHotel);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/find/:id', async (req, res) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		res.status(200).json(hotel);

		res.status(200).json(updatedHotel);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/', async (req, res) => {
	try {
		const hotels = await Hotel.find();
		res.status(200).json(hotels);

		res.status(200).json(updatedHotel);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/countByCity', async (req, res) => {
	const cities = req.query.cities.split(',');
	try {
		const list = await Promise.all(
			cities.map((city) => {
				return Hotel.countDocuments({ city: city });
			}),
		);
		res.status(200).json(list);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/countByType', async (req, res) => {
	try {
		const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
		const apartmentCount = await Hotel.countDocuments({
			type: 'apartment',
		});
		const resortCount = await Hotel.countDocuments({ type: 'resort' });
		const villaCount = await Hotel.countDocuments({ type: 'villa' });
		const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

		res.status(200).json([
			{ type: 'hotel', count: hotelCount },
			{ type: 'apartments', count: apartmentCount },
			{ type: 'resorts', count: resortCount },
			{ type: 'villas', count: villaCount },
			{ type: 'cabins', count: cabinCount },
		]);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/room/:id', async (req, res, next) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		const list = await Promise.all(
			hotel.rooms.map((room) => {
				return Room.findById(room);
			}),
		);
		res.status(200).json(list);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
