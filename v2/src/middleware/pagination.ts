import { Request, Response, NextFunction } from 'express';
import { Model, Document } from 'mongoose';
import { PAGE_LIMIT, PAGE_NUMBER } from '../constants/pagination.ts';

interface PaginationInfo {
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
  totalDocuments?: number
}

const getPaginationInfo = (
  page: number,
  limit: number,
  totalDocuments: number
): PaginationInfo => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginationInfo: PaginationInfo = {totalDocuments};

  if (endIndex < totalDocuments) {
    paginationInfo.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    paginationInfo.previous = {
      page: page - 1,
      limit,
    };
  }

  return paginationInfo;
};

const paginateResults = (model: Model<any>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const page: number = Number(req.query.page) || PAGE_NUMBER;
    const limit: number = Number(req.query.limit) || PAGE_LIMIT;

    const skip: number = (page - 1) * limit;

    
    try {
  
      const totalDocuments = await model.countDocuments({});
      console.log(totalDocuments)
      const paginationInfo: PaginationInfo = getPaginationInfo(page, limit, totalDocuments);

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
      next(error)
    }
  };
};

export default paginateResults;
