
import {
  type NextFunction,
  type Request,
  type Response
} from "express";
import { auth } from "../config/better-auth.ts";
import { toNodeHandler } from "better-auth/node";

const authMiddleware = toNodeHandler(auth);

export default (req: Request, res: Response, next: NextFunction) => {
  return authMiddleware(req, res);
};
