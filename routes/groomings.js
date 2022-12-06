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
})


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

module.exports = router;
