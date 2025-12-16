import express from 'express';
import { clerkWebhook } from '../controller/auth.ts';

const router = express.Router();

router.post("/webhook", clerkWebhook);

export default router;