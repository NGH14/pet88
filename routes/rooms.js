const express = require('express');

const router = express.Router();
const { Hotel } = require('../models/hotel.js');
const { Room } = require('../models/room.js');
const { route } = require('./users.js');

router.post('/:id', async (req, res) => {
	const hotelId = req.params.id;
	const newRoom = new Room(req.body);
	// res.status(200).json({ hotelId, newRoom });

	try {
		const savedRoom = await newRoom.save();
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$push: { rooms: savedRoom._id },
			});
		} catch (err) {
			res.status(500).json(err);
		}
		res.status(200).json(savedRoom);
	} catch (err) {
		res.json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updatedRoom = await Room.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true },
		);
		res.status(200).json(updatedRoom);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Room.findByIdAndDelete(req.params.id);
		res.status(200).json('Room has been deleted.');
		res.status(200).json(updatedRoom);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const room = await Room.findById(req.params.id);
		res.status(200).json(room);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/availability/found', async (req, res) => {
	try {
		const dates = req.body.dates;
		const roomList = await Room.find({
			_id: req.body.id,
		});
		const list = roomList.map((element) => {
			return {
				...element.toJSON(),
				roomNumbers: element.roomNumbers.filter(
					(rn) =>
						!rn.unavailableDates.some((ud) => !dates.includes(ud)),
				),
			};
		});
		res.json(list);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/', async (req, res) => {
	try {
		const rooms = await Room.find();

		res.status(200).json(rooms);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/availability/:id', async (req, res) => {
	try {
		await Room.updateOne(
			{ 'roomNumbers._id': req.params.id },
			{
				$push: {
					'roomNumbers.$.unavailableDates': req.body.dates,
				},
			},
		);
		res.status(200).json('Room status has been updated.');
	} catch (err) {
		res.status(500).json(err);
	}
});

router.patch('/multiple-delete', async (req, res) => {
	try {
		await Room.deleteMany({
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

module.exports = router;
