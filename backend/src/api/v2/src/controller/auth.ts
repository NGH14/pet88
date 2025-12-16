import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.ts';

export const clerkWebhook = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const { type, data } = req.body;

	try {
		switch (type) {
			case 'user.created':
				const newUser = new UserModel({
					clerkId: data.id,
					email: data.email_addresses[0].email_address,
					displayName: data.first_name + ' ' + data.last_name,
					photos: [{ value: data.profile_image_url }],
				});
				await newUser.save();
				break;
			case 'user.updated':
				await UserModel.findOneAndUpdate(
					{ clerkId: data.id },
					{
						email: data.email_addresses[0].email_address,
						displayName: data.first_name + ' ' + data.last_name,
						photos: [{ value: data.profile_image_url }],
					},
				);
				break;
			case 'user.deleted':
				await UserModel.findOneAndDelete({ clerkId: data.id });
				break;
		}
		res.status(200).json({ message: 'Webhook processed successfully' });
	} catch (error) {
		next(error);
	}
};

