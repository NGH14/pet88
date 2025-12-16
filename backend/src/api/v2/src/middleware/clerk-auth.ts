import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import { Request, Response, NextFunction } from 'express';

export const clerkAuth = ClerkExpressWithAuth();

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  // if (req.auth.userId) {
  //   next();
  // } else {
  //   res.status(401).json({ error: 'Unauthenticated!' });
  // }
};
