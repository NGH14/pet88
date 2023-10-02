import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.ts';

const SALT_ROUND: number = 10;

export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const { username, email, password, emailVerified, displayName, photos } =
		req.body;

	try {
		const hashedPassword: string = await bcrypt.hash(password, SALT_ROUND);
		const user = new UserModel({
			username,
			email,
			passwordHash: hashedPassword,
			emailVerified,
			displayName,
			photos,
		});
		await user.save();
		res.status(201).json({ message: 'Registration successful', data: user });
		next();
	} catch (error) {
		next(error);
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const { email, password } = req.body;
	try {
		const user = await UserModel.findOne({ email });
		if (!user) res.status(404).json({ message: `Email ${email} not exist` });
		const isMatch = await bcrypt.compare(password, user.passwordHash);

		res.status(201).json({ message: 'Login successful', data: isMatch });
	} catch (error) {
		next(error);
	}
};
