import { Request, Response, NextFunction } from 'express';
import { ERROR_MESSAGE_DEFAULT } from '../constants/error.ts';
import { Environment } from '../constants/environment.js';

const ErrorHandler = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (process.env.NODE_ENV === Environment.Testing) return ;
	const status = error.status || 500;
	
	res.status(status).json({
		success: false,
		status,
		message: error.message || ERROR_MESSAGE_DEFAULT,
		// Just show to stack (file directory got error) when development
		stack: process.env.NODE_ENV !== Environment.Development ? {} : error.stack,
	});
};

export default ErrorHandler;
