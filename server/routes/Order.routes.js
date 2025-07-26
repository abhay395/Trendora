import express from 'express'
import authenticationMiddleware from '../middleware/auth.js';
import OrderController from '../controller/Order.controller.js';
import asyncWrapper from '../middleware/async.js';
asyncWrapper
const orderRoute = express.Router();

orderRoute.post('/checkout', authenticationMiddleware, asyncWrapper(OrderController.checkoutProduct))
orderRoute.get('/get-All', authenticationMiddleware, asyncWrapper(OrderController.getOrders))
orderRoute.get('/get-by-id/:orderId', authenticationMiddleware, asyncWrapper(OrderController.getOrderById))

export default orderRoute