
import {
  auth
} from "../lib/better-auth.ts";

import { createAuthClient } from "better-auth/client";

import {
  type Request,
  type Response
} from "express";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
});

export const register = async (req: Request, res: Response): Promise<void> => {
  const {
    email,
    password
  } = req.body;
  try {
    const user = await authClient.register(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const {
    email,
    password
  } = req.body;
  try {
    const user = await authClient.login(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  const {
    refreshToken
  } = req.body;
  try {
    const user = await authClient.refresh(refreshToken);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};


