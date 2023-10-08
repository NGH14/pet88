import { Response, Request, NextFunction } from 'express';
import User from '../models/user.ts';

export async function GetAllUser(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { data, paginationInfo } = res.locals.paginatedResults;

		// Send the paginated data a response
		res.status(200).json({ data, paginationInfo });
	} catch (error) {
		next(error);
	}
}
export async function CreateUsers(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const savedUser = await new User(req.body).save();
		res.status(200).json(savedUser);
	} catch (error) {
		next(error);
	}
}
export async function UpdateUserById(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			req.body,
			// want to insert when field not exist
			{ setDefaultsOnInsert: true, upsert: true },
		);

		res.status(200).json(updatedUser);
		next();
	} catch (error) {
		next(error);
	}
}

export async function DeleteUserById(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: `User has been deleted` });
		next();
	} catch (error) {
		next(error);
	}
}
export async function DeleteUserByEmail(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		await User.deleteOne({ email: req.params.email });
		res.status(200).json({ message: `User has been deleted` });
	} catch (error) {
		res.status(500).json(error);
	}
}
export async function DeleteUsers(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		await User.deleteMany({
			_id: {
				$in: req.body,
			},
		});
		res.status(200).json(`Users has been deleted`);
		next();
	} catch (error) {
		next(error);
	}
}

export async function GetUserByID(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const user = await User.findById(req.params.id);
		if (!user) return res.status(404).send();
		res.status(200).json(user);
		next();
	} catch (error) {
		next(error);
	}
}
