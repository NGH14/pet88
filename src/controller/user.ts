import { Response, Request, NextFunction } from 'express';
import User from '../models/user.ts';

export async function GetAllUser(
	req: Request,
	res: Response,
	next: NextFunction,
) {
  try {
    const listUsers = await User.find();
    res.status(200).json(listUsers)
  } catch (err) {
    next(err)
  }
};

export async function CreateUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const savedUser = await new User(req.body).save();
		res.status(200).json(savedUser);
		next()
	} catch (err) {
		next(err)
	}
}
