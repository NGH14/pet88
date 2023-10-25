import { Request, Response, NextFunction } from 'express';
import { Model, Document } from 'mongoose';

import {
	MAXIMUM_LIMIT,
	PAGE_LIMIT,
	PAGE_NUMBER,
} from '../constants/pagination.ts';
import { PaginationMessage } from '../constants/message.js';

interface PaginationInfo {
	hasMore?: Boolean;
	totalDocuments?: number;
	totalPages?: number;
}

const getPaginationInfo = (
	page: number,
	limit: number,
	totalDocuments: number,
	totalPages: number,
): PaginationInfo => {
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const paginationInfo: PaginationInfo = {
		totalDocuments,
		totalPages,
		hasMore: false,
	};

	if (endIndex < totalDocuments) {
		paginationInfo.hasMore = true;
	}

	return paginationInfo;
};

const pagination = (model: Model<any>) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const page: number = Number(req.query.page) || PAGE_NUMBER;
		const limit: number = Number(req.query.limit) || PAGE_LIMIT;
		const skip: number = (page - 1) * limit;
		if (page < 1) {
			return next({
				message: PaginationMessage.PAGE_NUMBER_ERROR,
				status: 400,
			});
		}

		if (limit < 1 || limit > MAXIMUM_LIMIT) {
			return next({
				message: PaginationMessage.PAGE_NUMBER_ERROR,
				status: 400,
			});
		}

		try {
			const totalDocuments = await model.countDocuments({});
			const totalPages: number = Math.ceil(totalDocuments / limit);

			const paginationInfo: PaginationInfo = getPaginationInfo(
				page,
				limit,
				totalDocuments,
				totalPages,
			);

			const data = await model
				.find()
				.limit(limit)
				.skip((page - 1) * limit)
				.exec();

			res.locals.paginatedResults = {
				data,
				paginationInfo,
			};

			next();
		} catch (error) {
			next(error);
		}
	};
};

export default pagination;
