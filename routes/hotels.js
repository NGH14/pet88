import express from 'express';
import { Grooming } from '../models/grooming.js';

const router = express.Router();
import { Hotel } from '../models/hotel.js';
import { Room } from '../models/room.js';

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
	try {
		const hotelList = await Hotel.find({
			...req.body,
			services: { $in: [req.body.services] },
		});
		res.status(200).json(hotelList);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/find-grooming-able', async (req, res) => {
	try {
		const startDate = req.body.startDate;
		const endDate = req.body.endDate;
		const city = req.body.city;

		const groomingList = await Hotel.find({
			city,
			services: { $in: [req.body.services] },
		});
		if (startDate && endDate) {
			const list = await Promise.all(
				groomingList.map(async (_hotel) => {
					const hotel = _hotel.toJSON();
					return {
						...hotel,
						grooming: await Promise.all(
							hotel.grooming.map((room) =>
								Grooming.findById(room),
							),
						),
					};
				}),
			);

			const listData = list
				.flat()
				.map((hotel) => {
					return {
						...hotel,
						grooming: hotel.grooming
							.map((_room) => {
								const room = _room?.toJSON();
								return {
									...room,
									roomNumbers: room.roomNumbers.filter(
										(rn) =>
											!rn.unavailableDates.some((ud) => {
												const foo =
													(ud.startDate <= endDate &&
														ud.startDate >=
															startDate) ||
													(ud.endDate >= startDate &&
														ud.endDate <= endDate);
												return foo;
											}),
									),
								};
							})
							.filter((grooming) => grooming.roomNumbers?.length),
					};
				})
				.filter((hotel) =>
					hotel.grooming.some(
						(grooming) => grooming.roomNumbers?.length,
					),
				);

			res.status(200).json(listData);
		}

		res.status(200).json(groomingList);
	} catch (err) {
		res.json(err);
	}
});

router.get('/', async (req, res) => {
	try {
		const hotels = await Hotel.find();
		res.status(200).json(hotels);

		res.status(200).json(updatedHotel);
	} catch (err) {
		res.sendStatus(500).send({
			message: err.message || 'some error occured',
		});
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

router.post('/find-hotel-able', async (req, res) => {
	const city = req.body?.city;

	try {
		const dates = req.body?.dates?.map((d) =>
			new Date(d).toISOString().slice(0, 10),
		);
		const hotelList = await Hotel.find({
			city,
			services: { $in: [req.body.services] },
		});

		if (dates?.length > 0) {
			const list = await Promise.all(
				hotelList.map(async (_hotel) => {
					const hotel = _hotel.toJSON();
					return {
						...hotel,
						rooms: await Promise.all(
							hotel.rooms.map((room) => Room.findById(room)),
						),
					};
				}),
			);

			const listData = list
				.flat()
				.map((hotel) => {
					return {
						...hotel,
						rooms: hotel.rooms.map((_room) => {
							const room = _room?.toJSON();
							return {
								...room,
								roomNumbers: room?.roomNumbers.filter(
									(rn) =>
										!rn.unavailableDates.some((ud) =>
											dates.includes(
												ud.toISOString().slice(0, 10),
											),
										),
								),
							};
						}),
					};
				})
				.filter((hotel) =>
					hotel.rooms.some((r) => r.roomNumbers?.length),
				);

			res.status(200).json(listData);
		}

		res.status(200).json(hotelList);
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

router.post('/availability/grooming/:id', async (req, res) => {
	try {
		const startDate = req.body.startDate;
		const endDate = req.body.endDate;

		const hotel = await Hotel.findById(req.params.id);

		const list = await Promise.all(
			hotel.grooming.map((room) => {
				return Grooming.findById(room);
			}),
		);

		const listData = list
			.map((_element) => {
				const element = _element.toJSON();
				return {
					...element,
					roomNumbers: element.roomNumbers.filter(
						(rn) =>
							!rn.unavailableDates.some((ud) => {
								const foo =
									(ud.startDate <= endDate &&
										ud.startDate >= startDate) ||
									(ud.endDate >= startDate &&
										ud.endDate <= endDate);
								return foo;
							}),
					),
				};
			})
			.filter((data) => data.roomNumbers.length);

		res.status(200).json(listData);
	} catch (err) {
		res.status(500).json(err);
	}
});

export default router;
