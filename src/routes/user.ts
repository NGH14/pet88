
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 */

import express from 'express';
import { CreateUser, GetAllUser } from '../controller/user.ts';

const router = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *     tags: [users]
 *     description: Responds show all users
 *     responses:
 *       200:
 *         description: Get list users success
 */
router.get('/', GetAllUser);

router.post('/', CreateUser);


export default router;