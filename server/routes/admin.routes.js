import express from 'express'
import asyncWrapper from '../middleware/async.js';
import adminController from '../controller/Admin.controller.js';

let adminRoute = express.Router();





adminRoute.get('/dashboard', asyncWrapper(adminController.getDashBoard));
//*--------------------------------------------------------------------------USER API---------------------------------------------------------------------------\\

adminRoute.get('/user/', asyncWrapper(adminController.getUser))
adminRoute.get('/user/:id', asyncWrapper(adminController.getUserById))
adminRoute.post('/user/create', asyncWrapper(adminController.createUser))
adminRoute.patch('/user/update/:id', asyncWrapper(adminController.updateUser))
adminRoute.delete('/user/hard-delete/:id', asyncWrapper(adminController.hardDeleteUser))

//*--------------------------------------------------------------------------Order API---------------------------------------------------------------------------\\

adminRoute.get('/orders/', asyncWrapper(adminController.getOrder))
adminRoute.get('/orders/:id', asyncWrapper(adminController.getOrderById))
adminRoute.patch('/orders/update/:id', asyncWrapper(adminController.updateOrder))

//*--------------------------------------------------------------------------Product API---------------------------------------------------------------------------\\

adminRoute.post('/product/create', asyncWrapper(adminController.createProduct))
adminRoute.get('/product/', asyncWrapper(adminController.getProducts))
adminRoute.get('/product/:id', asyncWrapper(adminController.getProductById))
adminRoute.patch('/product/update/:id', asyncWrapper(adminController.updateProductId))
adminRoute.delete('/product/:id', asyncWrapper(adminController.deleteProduct))

export default adminRoute