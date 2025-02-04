import express from 'express';
import departmentRoute from "./department.js"
import checkoutRoute from './checkout.js';
import couponRoute from './coupon.js';
import groomingRoute from './grooming.js';
import orderRoute from './order.js';
import promotionRoute from './promotion.js';
import roomRoute from './rooms.js';
import userRoute from './user.js';
import authRoute from './auth.ts'
import emailRoute from './email.ts'
import ErrorHandler from '../middleware/error.js';

const rootRouter = express.Router();

/**
 * @swagger
 * /health-check:
 *  get:
 *     tags:
 *     - heath-check
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running 
 */

rootRouter.get('/health-check', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date().toLocaleString("vi-VI")
  }
  res.status(200).send(data);
});

rootRouter.use('/users', userRoute);
rootRouter.use('/auth', authRoute);
rootRouter.use('/departments', departmentRoute);
rootRouter.use('/department-rooms', roomRoute);
rootRouter.use('/groomings', groomingRoute);
rootRouter.use('/checkouts', checkoutRoute);
rootRouter.use('/orders', orderRoute);
rootRouter.use('/coupons', couponRoute);
rootRouter.use('/promotions', promotionRoute);
rootRouter.use('/email', emailRoute);


export default rootRouter;