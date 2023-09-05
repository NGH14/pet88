import express from 'express';
import { Grooming } from '../models/grooming.js';

const router = express.Router();
import { Department } from '../models/department.ts';
import { Room } from '../models/room.js';
import {
	CreateDepartment,
	CreateDepartments,
	DeleteDepartmentByID,
	DeleteDepartments,
	FindDepartmentByID,
	GetAllDepartment,
	UpdateDepartmentByID,
} from '../controller/department.ts';

router.post('/', CreateDepartment);
router.post('/list', CreateDepartments);

router.get('/', GetAllDepartment);

router.put('/:id', UpdateDepartmentByID);

router.delete('/:id', DeleteDepartmentByID);

router.patch('/multiple-delete', DeleteDepartments);

router.get('/:id', FindDepartmentByID);

router.get('/find-hotel', async (req, res) => {
	try {
		const DepartmentList = await Department.find({
			...req.body,
			services: { $in: [req.body.services] },
		});
		res.status(200).json(DepartmentList);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/find-grooming-able', async (req, res) => {
	try {
		const startDate = req.body.startDate;
		const endDate = req.body.endDate;
		const city = req.body.city;

		const groomingList = await Department.find({
			city,
			services: { $in: [req.body.services] },
		});
		if (startDate && endDate) {
			const list = await Promise.all(
				groomingList.map(async (_Department) => {
					const Department = _Department.toJSON();
					return {
						...Department,
						grooming: await Promise.all(
							Department.grooming.map((room) => Grooming.findById(room)),
						),
					};
				}),
			);

			const listData = list
				.flat()
				.map((Department) => {
					return {
						...Department,
						grooming: Department.grooming
							.map((_room) => {
								const room = _room?.toJSON();
								return {
									...room,
									roomNumbers: room.roomNumbers.filter(
										(rn) =>
											!rn.unavailableDates.some((ud) => {
												const foo =
													(ud.startDate <= endDate &&
														ud.startDate >= startDate) ||
													(ud.endDate >= startDate && ud.endDate <= endDate);
												return foo;
											}),
									),
								};
							})
							.filter((grooming) => grooming.roomNumbers?.length),
					};
				})
				.filter((Department) =>
					Department.grooming.some((grooming) => grooming.roomNumbers?.length),
				);

			res.status(200).json(listData);
		}

		res.status(200).json(groomingList);
	} catch (err) {
		res.json(err);
	}
});

router.get('/by-city', async (req, res) => {
	const cities = req.query.cities.split(',');
	try {
		const list = await Promise.all(
			cities.map((city) => {
				return Department.countDocuments({ city: city });
			}),
		);
		res.status(200).json(list);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/room/:id', async (req, res) => {
	try {
		const Department = await Department.findById(req.params.id);

		const list = await Promise.all(
			Department.rooms.map((room) => {
				return Room.findById(room);
			}),
		);

		res.status(200).json(list);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/find-department-able', async (req, res) => {
	const city = req.body?.city;

	try {
		const dates = req.body?.dates?.map((d) =>
			new Date(d).toISOString().slice(0, 10),
		);
		const DepartmentList = await Department.find({
			city,
			services: { $in: [req.body.services] },
		});

		if (dates?.length > 0) {
			const list = await Promise.all(
				DepartmentList.map(async (_Department) => {
					const Department = _Department.toJSON();
					return {
						...Department,
						rooms: await Promise.all(
							Department.rooms.map((room) => Room.findById(room)),
						),
					};
				}),
			);

			const listData = list
				.flat()
				.map((Department) => {
					return {
						...Department,
						rooms: Department.rooms.map((_room) => {
							const room = _room?.toJSON();
							return {
								...room,
								roomNumbers: room?.roomNumbers.filter(
									(rn) =>
										!rn.unavailableDates.some((ud) =>
											dates.includes(ud.toISOString().slice(0, 10)),
										),
								),
							};
						}),
					};
				})
				.filter((Department) =>
					Department.rooms.some((r) => r.roomNumbers?.length),
				);

			res.status(200).json(listData);
		} else {
			res.status(200).json(DepartmentList);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/availability/:id', async (req, res) => {
	try {
		const dates = req.body.dates.map((d) =>
			new Date(d).toISOString().slice(0, 10),
		);
		const Department = await Department.findById(req.params.id);

		const list = await Promise.all(
			Department.rooms.map((room) => {
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

		const Department = await Department.findById(req.params.id);

		const list = await Promise.all(
			Department.grooming.map((room) => {
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
									(ud.startDate <= endDate && ud.startDate >= startDate) ||
									(ud.endDate >= startDate && ud.endDate <= endDate);
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
