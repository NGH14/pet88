import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.ts';
import { JWT_TOKEN_EXPIRE_TIME, SALT_ROUND } from '../constant/auth.ts';
import jwt from 'jsonwebtoken';
export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const { email, password, emailVerified, displayName, photos } = req.body;

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
		res
			.status(201)
			.json({ message: 'Registration successful', data: newUser.email });
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
			return res
				.status(401)
				.json({ message: 'Login Failed: Invalid username or password' });
		}
		const userToken = jwt.sign(
			{ id: user.id, roles: user.roles },
			process.env.JWT_SECRET_KEY,
			{ expiresIn: JWT_TOKEN_EXPIRE_TIME},
		);
		
		res.status(200).json({ message: 'Login successful', data: userToken });
	} catch (error) {
		next(error);
	}
};

