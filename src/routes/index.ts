import express from 'express';

const rootRouter = express.Router();

import departmentRoute from "./department.js"
import checkoutRoute from './checkout.js';
import couponRoute from './coupons.js';
import groomingRoute from './grooming.js';
import orderRoute from './orders.js';
import promotionRoute from './promotions.js';
import roomRoute from './rooms.js';
import userRoute from './users.js';
import emailRoute from './email.ts'

/**
 * @swagger
 * /health-check:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
rootRouter.get('/health-check', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  }
  res.status(200).send(data);
});

rootRouter.use('/users', userRoute);
rootRouter.use('/departments', departmentRoute);
rootRouter.use('/department-rooms', roomRoute);
rootRouter.use('/groomings', groomingRoute);
rootRouter.use('/checkouts', checkoutRoute);
rootRouter.use('/orders', orderRoute);
rootRouter.use('/coupons', couponRoute);
rootRouter.use('/promotions', promotionRoute);
rootRouter.use('/email', emailRoute);


export default rootRouter;