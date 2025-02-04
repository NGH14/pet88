import { Request, Response, NextFunction, RequestHandler } from 'express';
import Department, { IDepartment } from '../models/department.ts';

export async function CreateDepartment(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const savedDepartment: IDepartment = await new Department(req.body).save();
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
		const savedDepartments:IDepartment = await Department.create(req.body);
		res.status(200).json(savedDepartments);
		next();
	} catch (error) {
		next(error);
	}
}

export function GetAllDepartment(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { data, paginationInfo } = res.locals.paginatedResults;

		// Send the paginated da a response
		res.status(200).json({ data, paginationInfo });
		next();
	} catch (error) {
		next(error);
	}
}

export async function UpdateDepartmentByID(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const id = req.params.id;
	try {
		const updatedDepartment = await Department.findByIdAndUpdate(
			req.params.id,
			req.body,
		);
		res.status(200).json({message: `Update Department ${id} Success`});
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
