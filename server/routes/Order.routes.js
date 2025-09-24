import express from 'express'
import authenticationMiddleware from '../middleware/auth.js';
import OrderController from '../controller/Order.controller.js';
import asyncWrapper from '../middleware/async.js';
asyncWrapper
const orderRoute = express.Router();

orderRoute.post('/checkout', authenticationMiddleware, asyncWrapper(OrderController.checkoutProduct))
orderRoute.get('/history', authenticationMiddleware, asyncWrapper(OrderController.getOrders))
orderRoute.get('/:orderId', authenticationMiddleware, asyncWrapper(OrderController.getOrderById))
orderRoute.post('/verify-payment', authenticationMiddleware, asyncWrapper(OrderController.verifyPayment))

export default orderRoute