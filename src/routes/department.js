/**
 * @swagger
 * tags:
 *   name: departments
 *   description: The departments managing API
 */

import express from 'express';
import { Grooming } from '../models/grooming.js';
import paginateResults from '../middleware/pagination.ts';

import Department from '../models/department.ts';
import { Room } from '../models/room.js';
import {
	CreateDepartment,
	CreateDepartments,
	DeleteDepartmentByID,
	DeleteDepartments,
	GetDepartmentByID,
	GetAllDepartment,
	UpdateDepartmentByID,
} from '../controller/department.ts';

const router = express.Router();

router.post('/', CreateDepartment);
router.post('/list', CreateDepartments);

/**
 * @swagger
 * /departments:
 *  get:
 *     tags: [departments]
 *     description: Responds show all departments
 *     responses:
 *       200:
 *         description: Get list departments success
 */
router.get('/', paginateResults(Department), GetAllDepartment);

/**
 * @swagger
 * /departments/{id}:
 *   get:
 *     summary: Get the department by id
 *     tags: [departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The departments id
 *     responses:
 *       200:
 *         description: The department description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/department'
 *       404:
 *         description: The department was not found
 */
router.get('/:id', GetDepartmentByID);

/**
 * @swagger
 * /departments/{id}:
 *   put:
 *     summary: Update a department by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the department to update
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: department
 *         description: The updated department data
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Department'
 *     responses:
 *       200:
 *         description: Department updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Department'
 *       404:
 *         description: Department not found
 *     tags:
 *       - Departments
 */
router.put('/:id', UpdateDepartmentByID);

/**
 * @swagger
 * /departments/{id}:
 *   delete:
 *     summary: Delete a department by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the department to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *       404:
 *         description: Department not found
 *     tags:
 *       - Departments
 */

/**
 * @swagger
 * /departments/multiple-delete:
 *   patch:
 *     summary: Delete multiple departments
 *     requestBody:
 *       description: List of department IDs to delete
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *     responses:
 *       200:
 *         description: Departments deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *     tags:
 *       - Departments
 */
router.delete('/:id', DeleteDepartmentByID);

/**
 * @swagger
 * /departments/{id}:
 *   get:
 *     summary: Get a department by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the department to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Department'
 *       404:
 *         description: Department not found
 *     tags:
 *       - Departments
 */

router.patch('/multiple-delete', DeleteDepartments);

router.get('/find-hotel', async (req, res) => {
	try {
		const DepartmentList = await Department.find({
			...req.body,
			services: { $in: [req.body.services] },
		});
		res.status(200).json(DepartmentList);
		next();
	} catch (error) {
		next(error);
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
	} catch (error) {
		res.json(error);
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
	} catch (error) {
		res.status(500).json(error);
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
	} catch (error) {
		res.status(500).json(error);
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
	} catch (error) {
		res.status(500).json(error);
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
	} catch (error) {
		res.json(error);
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
	} catch (error) {
		res.status(500).json(error);
	}
});

export default router;
