import { Roles } from './../constant/roles.ts';
import authMiddleware from '../middleware/better-auth.ts';

/**
 * @swagger
 * tags:
 *   name: users
 *   description: The Users managing API
 */

import express from 'express';
import {
	GetAllUser,
	UpdateUserById,
	DeleteUserById,
	DeleteUsers,
	GetUserByID,
	CreateUsers,
	DeleteUserByEmail,
} from '../controller/user.ts';
import UserModel from '../models/user.js';
import paginateResults from '../middleware/pagination.ts';

const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * /users:
 *  get:
 *     tags: [users]
 *     description: Responds show all users
 *     responses:
 *       200:
 *         description: A paginated list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: List of users
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 paginationInfo:
 *                   type: object
 *                   description: Pagination information
 *                   properties:
 *                     hasMore:
 *                       type: boolean
 *                       description: the exist next page in pagination
 */
router.get('/', authMiddleware, paginateResults(UserModel), GetAllUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [users]
 *     summary: Get a user by ID
 *     description: Retrieve a user's information by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the user to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with user data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/:id', authMiddleware, GetUserByID);

/**
 * @swagger
 *  /users:
 *   post:
 *     tags: [users]
 *     summary: Create a new user
 *     description: Create a new user with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully created a new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user object to create.
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/User'  # Replace with your User schema reference
 */

router.post('/', authMiddleware, CreateUsers);

router.put('/:id', authMiddleware, UpdateUserById);

router.delete('/:id', authMiddleware, DeleteUserById);
router.patch('/:email', authMiddleware, DeleteUserByEmail);

router.patch('/multiple-delete', authMiddleware, DeleteUsers);

export default router;
