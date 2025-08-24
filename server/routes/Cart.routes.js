import express from 'express';
import authenticationMiddleware from '../middleware/auth.js';
// import CartService from '../service/Cart.service.js';
import asyncWrapper from '../middleware/async.js';
import CartController from '../controller/Cart.controller.js';
const cartRoute = express.Router();

cartRoute.post('/create',authenticationMiddleware,asyncWrapper(CartController.createCart))
cartRoute.get("/get-all", authenticationMiddleware, asyncWrapper(CartController.getCartProduct))
cartRoute.put('/update-many',authenticationMiddleware,asyncWrapper(CartController.updateManyCartProduct)) // For Handling select logic in fronted 
cartRoute.put("/update/:cartId", authenticationMiddleware, asyncWrapper(CartController.updateCart))
cartRoute.delete("/remove-product/:cartId", authenticationMiddleware, asyncWrapper(CartController.RemoveProductFromCart))

export default cartRoute