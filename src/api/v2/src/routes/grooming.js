import express from 'express';

const router = express.Router();
import Department from '../models/department.ts';
import { Grooming } from '../models/grooming.js';

router.get('/', async (_req, res) => {
	try {
		const rooms = await Grooming.find();

		res.status(200).json(rooms);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const room = await Grooming.findById(req.params.id);
		res.status(200).json(room);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/room/:id', async (req, res) => {
	try {
		const rooms = await Grooming.find({ 'roomNumbers._id': req.params.id });
		const room = rooms[0].roomNumbers.find((rId) => rId._id == req.params.id);

		res.status(200).json(room);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/room/event/:id', async (req, res) => {
	try {
		const rooms = await Grooming.find({
			'roomNumbers.unavailableDates': {
				$elemMatch: { id: req.params.id },
			},
		});
		const room = rooms[0].roomNumbers.find((r) =>
			r.unavailableDates.find((item) => item.id == req.params.id),
		);

		res.status(200).json(room);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.put('/room/event/:id', async (req, res) => {
	try {
		const rooms = await Grooming.findOneAndUpdate(
			{ 'roomNumbers.unavailableDates.id': req.params.id },
			{
				$set: {
					'roomNumbers.0.unavailableDates.$[ud].startDate': req.body.startDate,
					'roomNumbers.0.unavailableDates.$[ud].endDate': req.body.endDate,
					'roomNumbers.0.unavailableDates.$[ud].title': req.body.title,
					'roomNumbers.0.unavailableDates.$[ud].order': req.body.order,
				},
			},
			{
				arrayFilters: [{ 'ud.id': req.params.id }],
			},
		).catch((error) => console.log(error));

		res.status(200).json('Update Success');
	} catch (error) {
		res.status(500).json(error);
	}
});

router.put('/room/event/delete/:id', async (req, res) => {
	try {
		await Grooming.updateOne(
			{ 'roomNumbers.unavailableDates.id': req.params.id },
			{
				$pull: {
					'roomNumbers.$[].unavailableDates': { id: req.params.id },
				},
			},
		).catch((error) => console.log(error));

		res.status(200).json('Delete Success');
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/:id', async (req, res) => {
	const hotelId = req.params.id;
	const newGrooming = new Grooming(req.body);

	try {
		const savedGrooming = await newGrooming.save();
		try {
			await Department.findByIdAndUpdate(hotelId, {
				$push: { grooming: savedGrooming._id },
			});
		} catch (error) {
			res.status(500).json(error);
		}
		res.status(200).json(savedGrooming);
	} catch (error) {
		res.json(error);
	}
});

router.put('/availability/:id', async (req, res) => {
	try {
		await Grooming.updateOne(
			{ 'roomNumbers._id': req.params.id },
			{
				$push: {
					'roomNumbers.$.unavailableDates': req.body.dates,
				},
			},
		);
		res.status(200).json('Grroming status has been updated.');
	} catch (error) {
		res.status(500).json(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const grooming = await Grooming.findByIdAndDelete(req.params.id);
		res.status(200).json(`Grooming has been deleted. ${grooming}`);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updatedGrooming = await Grooming.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true },
		);
		res.status(200).json(updatedGrooming);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.patch('/multiple-delete', async (req, res) => {
	try {
		await Grooming.deleteMany({
			_id: {
				$in: req.body,
			},
		});
		res.status(200).json('Departmet has been deleted.');
	} catch (error) {
		res.status(500).json(error);
	}
});

export default router;
