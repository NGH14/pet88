import { Roles } from './../constant/roles.ts';
import { IUser } from './../models/user.ts';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';


export async function auth(roles: Roles, req, res, next) {

    const authorizationHeader = req.headers?.authorization;
    if (!authorizationHeader) {
      res.status(403).json({ message: 'Forbidden: Unauthorized' });
      return;
    }

    const accessToken = authorizationHeader.split(' ')[1];

    try {
      await jwt.verify(
        accessToken,
        process.env.JWT_SECRET_KEY,
        (err, user) => {
          if (err) {
            return res.status(403).json({ message: `Invalid Token ${accessToken}` });
          }
          if (!roles) {
            !roles.includes(user?.roles)
              ? next()
              : res
                .status(403)
                .json(
                  `Unauthorized: The client has the necessary credentials but is not authorized to access the requested resource.`,
                );
          }
          next()
        },
      );

    } catch (err) {
      res.status(401).send('Invalid Token');
    }
  };



