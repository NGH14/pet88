import { Request, Response, NextFunction } from 'express';
import { Model, Document } from 'mongoose';

interface PaginationInfo {
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
}

const getPaginationInfo = (
  page: number,
  limit: number,
  totalDocuments: number
): PaginationInfo => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginationInfo: PaginationInfo = {};

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
    let page: number = Number(req.query.page);
    let limit: number = Number(req.query.limit);
    const skip: number = (page - 1) * limit;
  
    if (isNaN(page) || page < 1) {
      page = 1; 
    }
  
    if (isNaN(limit) || limit < 1) {
      limit = 5;
    }
    
    try {
  
      const totalDocuments = await model.countDocuments();
      const paginationInfo = getPaginationInfo(page, limit, totalDocuments);

      const results = await model
        .find()
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();

      res.locals.paginatedResults = {
        results,
        paginationInfo,
      };

      next();
    } catch (error) {
      next(error)
    }
  };
};

export default paginateResults;
