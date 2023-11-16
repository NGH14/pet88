import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.ts';
import { SALT_ROUND } from "../constant/auth.ts";

export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const { email, password, emailVerified, displayName, photos } =
		req.body;

	try {
		const hashedPassword: string = await bcrypt.hash(password, SALT_ROUND);
		const newUser = new UserModel({
			email,
			password: hashedPassword,
			emailVerified,
			displayName,
			photos,
		});
		await newUser.save();
		res.status(201).json({ message: 'Registration successful', data: newUser });
		next();
	} catch (error) {
		next(error);
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response> => {
	const { email, password } = req.body;
	try {
		const user = await UserModel.findOne({ email });
		
		if (!user) res.status(404).json({ message: `Email ${email} not exist` });

		const isMatch = await bcrypt.compare(password, user.password);
		
		if (!isMatch) {
			 return res.status(401).json({ message: 'Login Failed' });
		} 
		res.status(200).json({ message: 'Login successful' });
	} catch (error) {
		next(error);
	}
};
