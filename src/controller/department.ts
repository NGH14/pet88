import { Request, Response, NextFunction, RequestHandler } from 'express';
import Department from '../models/department.ts';

type Params = {};
type ResBody = {};
type ReqBody = {};
type ReqQuery = {
    page: number;
}

export async function CreateDepartment(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const savedDepartment = await new Department(req.body).save();
		res.status(200).json(savedDepartment);
	} catch (error) {
		next(error);
	}
}

export async function CreateDepartments(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const savedDepartments = await Department.create(req.body);
		res.status(200).json(savedDepartments);
		next();
	} catch (error) {
		next(error);
	}
}

export  const  GetAllDepartment: RequestHandler<Params, ResBody, ReqBody, ReqQuery> = async (
	req,
	res,
	next
) => {
	const page: number = req?.query?.page  || 0;
	const itemsPerPage: number = 3;
	try {
		const listDepartments = await Department.find()
			.skip(page * itemsPerPage)
			.limit(itemsPerPage);
		res.status(200).json(listDepartments);
	} catch (error) {
		next(error);
	}
}

export async function UpdateDepartmentByID(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const updatedDepartment = await Department.findByIdAndUpdate(
			req.params.id,
			req.body,
		);
		res.status(200).json(updatedDepartment);
		next();
	} catch (error) {
		next(error);
	}
}

export async function DeleteDepartmentByID(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		await Department.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: `Department has been deleted` });
		next();
	} catch (error) {
		next(error);
	}
}
export async function DeleteDepartments(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		await Department.deleteMany({
			_id: {
				$in: req.body,
			},
		});
		res.status(200).json(`Departments has been deleted`);
		next();
	} catch (error) {
		next(error);
	}
}

export async function GetDepartmentByID(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const department = await Department.findById(req.params.id);
		if (!department) return res.status(404).send();
		res.status(200).json({
			success: true,
			status: 200,
			message: 'Get Department Success',
			data: department,
		});
		next();
	} catch (error) {
		next(error);
	}
}
