import express from 'express';

const rootRouter = express.Router();
import departmentRoute from "./department.js"
import checkoutRoute from './checkout.js';
import couponRoute from './coupons.js';
import groomingRoute from './groomings.js';
import orderRoute from './orders.js';
import promotionRoute from './promotions.js';
import roomRoute from './rooms.js';
import userRoute from './users.js';

rootRouter.use('/user', userRoute);
rootRouter.use('/departments', departmentRoute);
rootRouter.use('/department-room', roomRoute);
rootRouter.use('/grooming', groomingRoute);
rootRouter.use('/checkout', checkoutRoute);
rootRouter.use('/order', orderRoute);
rootRouter.use('/coupon', couponRoute);
rootRouter.use('/promotion', promotionRoute);



export default rootRouter;