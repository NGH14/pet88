const express = require('express');

const router = express.Router();
const { Hotel } = require('../models/hotel.js');
const { Grooming } = require('../models/grooming.js');

router.get('/', async (req, res) => {
	try {
		const rooms = await Grooming.find();

		res.status(200).json(rooms);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const room = await Grooming.findById(req.params.id);
		res.status(200).json(room);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/room/:id', async (req, res) => {
	try {
		const rooms = await Grooming.find({ 'roomNumbers._id': req.params.id });
		const room = rooms[0].roomNumbers.find(
			(rId) => rId._id == req.params.id,
		);

		res.status(200).json(room);
	} catch (err) {
		res.status(500).json(err);
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
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/room/event/:id', async (req, res) => {
	try {
		const rooms = await Grooming.findOneAndUpdate(
			{ 'roomNumbers.unavailableDates.id': req.params.id },
			{
				$set: {
					'roomNumbers.0.unavailableDates.$[ud].startDate':
						req.body.startDate,
					'roomNumbers.0.unavailableDates.$[ud].endDate':
						req.body.endDate,
					'roomNumbers.0.unavailableDates.$[ud].title':
						req.body.title,
				},
			},
			{
				arrayFilters: [{ 'ud.id': req.params.id }],
			},
		).catch((err) => console.log(err));

		res.status(200).json('Update Success');
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/room/event/delete/:id', async (req, res) => {
	try {
		const rooms = await Grooming.updateOne(
			{ 'roomNumbers.unavailableDates.id': req.params.id },
			{
				$pull: {
					'roomNumbers.$[].unavailableDates': { id: req.params.id },
				},
			},
			// {
			// 	arrayFilters: [
			// 		{ 'rn.unavailableDates': { id: req.params.id } },
			// 	],
			// },
		).catch((err) => console.log(err));

		res.status(200).json('Delete Success');
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/:id', async (req, res) => {
	const hotelId = req.params.id;
	const newGrooming = new Grooming(req.body);

	try {
		const savedGrooming = await newGrooming.save();
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$push: { grooming: savedGrooming._id },
			});
		} catch (err) {
			res.status(500).json(err);
		}
		res.status(200).json(savedGrooming);
	} catch (err) {
		res.json(err);
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
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Grooming.findByIdAndDelete(req.params.id);
		res.status(200).json('Grooming has been deleted.');
	} catch (err) {
		res.status(500).json(err);
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
	} catch (err) {
		res.status(500).json(err);
	}
});

router.patch('/multiple-delete', async (req, res) => {
	try {
		await Grooming.deleteMany({
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
