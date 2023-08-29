import express from 'express';
import {createNewDepartment, getAllDepartment} from "../models/department.ts"
export async function CreateDepartment(req: express.Request, res: express.Response) {
    try {
		const savedDepartment = await createNewDepartment(req.body);
		res.status(200).json(savedDepartment);
	} catch (err) {
		res.status(500).json(err);
	}
}

export async function GetAllDepartment(_req: express.Request, res: express.Response) {
    try {
		const listDepartments = await getAllDepartment();
		res.status(200).json(listDepartments);
	} catch (err) {
		res.status(500).json(err);
	}
}


