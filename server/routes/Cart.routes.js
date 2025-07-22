import express from 'express';
import authenticationMiddleware from '../middleware/auth.js';
// import CartService from '../service/Cart.service.js';
import asyncWrapper from '../middleware/async.js';
import CartController from '../controller/Cart.controller.js';
const cartRoute = express.Router();

cartRoute.post('/create-cart',authenticationMiddleware,asyncWrapper(CartController.createCart))
cartRoute.get("/get-cart", authenticationMiddleware, asyncWrapper(CartController.getCartProduct))
cartRoute.post("/update-cart/:cartId", authenticationMiddleware, asyncWrapper(CartController.updateCartQuantity))
cartRoute.delete("/remove-cart-product/:cartId", authenticationMiddleware, asyncWrapper(CartController.RemoveProductFromCart))

export default cartRoute