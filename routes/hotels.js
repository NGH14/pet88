const express = require('express');

const router = express.Router();
const { Hotel } = require('../models/hotel.js');
const { Room } = require('../models/room.js');

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

router.patch('/multiple-delete', async (req, res) => {
	try {
		// const a = await Hotel.find({
		// 	_id: {
		// 		$in: req.body,
		// 	},
		// });
		await Hotel.deleteMany({
			_id: {
				$in: req.body,
			},
		});
		// res.status(200).json(a);
		res.status(200).json('Departmet has been deleted.');
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Hotel.findByIdAndDelete(req.params.id);
		res.status(200).json('Hotel has been deleted.');
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/find/:id', async (req, res) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		res.status(200).json(hotel);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/find-hotel', async (req, res) => {
	const { cheapestPrice, services, ...rest } = req.query;
	if (cheapestPrice) {
		rest.cheapestPrice = { $gt: cheapestPrice };
	}
	if (services) {
		servicesArray = services.split(',');

		rest.services = { $in: servicesArray };
	}
	try {
		const hotel = await Hotel.find(rest);
		res.status(200).json(hotel);
	} catch (err) {
		res.status(400).json(err);
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

router.get('/room/:id', async (req, res) => {
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

router.post('/availability/:id', async (req, res) => {
	try {
		const dates = req.body.dates.map((d) =>
			new Date(d).toISOString().slice(0, 10),
		);
		const hotel = await Hotel.findById(req.params.id);

		const list = await Promise.all(
			hotel.rooms.map((room) => {
				return Room.findById(room);
			}),
		);

		const listData = list
			.map((element) => {
				return {
					...element.toJSON(),
					roomNumbers: element.roomNumbers.filter(
						(rn) =>
							!rn.unavailableDates.some((ud) =>
								dates.includes(ud.toISOString().slice(0, 10)),
							),
					),
				};
			})
			.filter((data) => data.roomNumbers.length);

		res.status(200).json(listData);
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
