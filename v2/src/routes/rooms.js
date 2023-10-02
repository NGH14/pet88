import express from 'express';

const router = express.Router();
import Department from '../models/department.ts';
import { Room } from '../models/room.js';

router.post('/:id', async (req, res) => {
	const hotelId = req.params.id;
	const newRoom = new Room(req.body);

	try {
		const savedRoom = await newRoom.save();
		try {
			await Department.findByIdAndUpdate(hotelId, {
				$push: { rooms: savedRoom._id },
			});
		} catch (error) {
			res.status(500).json(error);
		}
		res.status(200).json(savedRoom);
	} catch (error) {
		res.json(error);
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
	} catch (error) {
		res.status(500).json(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Room.findByIdAndDelete(req.params.id);
		res.status(200).json('Room has been deleted.');
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const room = await Room.findById(req.params.id);
		res.status(200).json(room);
	} catch (error) {
		res.status(500).json(error);
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
					(rn) => !rn.unavailableDates.some((ud) => !dates.includes(ud)),
				),
			};
		});
		res.json(list);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/', async (req, res) => {
	try {
		const rooms = await Room.find();

		res.status(200).json(rooms);
	} catch (error) {
		res.status(500).json(error);
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
	} catch (error) {
		res.status(500).json(error);
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
	} catch (error) {
		res.status(500).json(error);
	}
});

export default router;
