import express from 'express';
import {
	createListDepartments,
	createNewDepartment,
	deleteDepartment,
	deleteDepartments,
	getAllDepartment,
	getDepartmentByID,
	updateDepartment,
} from '@models/department.ts';

export async function CreateDepartment(
	req: express.Request,
	res: express.Response,
) {
	try {
		const savedDepartment = await createNewDepartment(req.body);
		res.status(200).json(savedDepartment);
	} catch (err) {
		res.status(500).json(err);
	}
}

export async function CreateDepartments(
	req: express.Request,
	res: express.Response,
) {
	try {
		const savedDepartments = await createListDepartments(req.body);
		res.status(200).json(savedDepartments);
	} catch (err) {
		res.status(500).json(err);
	}
}

export async function GetAllDepartment(
	_: express.Request,
	res: express.Response,
) {
	try {
		const listDepartments = await getAllDepartment();
		res.status(200).json(listDepartments);
	} catch (err) {
		res.status(500).json(err);
	}
}

export async function UpdateDepartmentByID(
	req: express.Request,
	res: express.Response,
) {
	try {
		const updatedDepartment = await updateDepartment(req.params.id, req.body);

		res.status(200).json(updatedDepartment);
	} catch (err) {
		res.status(500).json(err);
	}
}

export async function DeleteDepartmentByID(
	req: express.Request,
	res: express.Response,
) {
	try {
		await deleteDepartment(req.params.id);
		res.status(200).json({ message: `Department has been deleted` });
	} catch (err) {
		res.status(500).json(err);
	}
}
export async function DeleteDepartments(
	req: express.Request,
	res: express.Response,
) {
	try {
		await deleteDepartments(req.body);
		res.status(200).json(`Departments has been deleted`);
	} catch (err) {
		res.status(500).json(err);
	}
}

export async function FindDepartmentByID(
	req: express.Request,
	res: express.Response,
) {
	try {
		const Department = await getDepartmentByID(req.params.id);
		res.status(200).json(Department);
	} catch (err) {
		res.status(500).json(err);
	}
}
