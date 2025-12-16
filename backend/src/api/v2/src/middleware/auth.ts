import { Roles } from './../constant/roles.ts';
import { IUser } from './../models/user.ts';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface JwtPayload {
  roles: Roles
}

async function auth(
  roles: Array<Roles> | undefined,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {

  const authorizationHeader = req.headers?.authorization;
  if (!authorizationHeader) {
    res.status(403).json({ message: 'Forbidden: Unauthorized' });
    return;
  }

  const accessToken = authorizationHeader.split(' ')[1];

  try {
    await jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, user: JwtPayload) => {
      if (err) {
        return res
          .status(403)
          .json({ message: `Invalid Token ${accessToken}` });
      }
      if (roles) {
        console.log({roles, user: user.roles })
        return roles.some((accessRoles) => user.roles.includes(accessRoles))
          ? next()
          : res
            .status(403)
            .json(
              `Access denied: Incorrect permissions`,
            );
      }
      next();
    });
  } catch (err) {
    res.status(401).send('Invalid Token');
  }
}

export { auth };
