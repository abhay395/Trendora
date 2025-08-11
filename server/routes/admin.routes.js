import express from 'express'
import asyncWrapper from '../middleware/async.js';
import adminController from '../controller/admin.controller.js';

let adminRoute = express.Router();

adminRoute.get('/user/',asyncWrapper(adminController.getUser))
adminRoute.post('/user/create',asyncWrapper(adminController.createUser))
adminRoute.get('/user/:id',asyncWrapper(adminController.getUserById))
adminRoute.patch('/user/:id',asyncWrapper(adminController.updateUser))
adminRoute.delete('/user/hard-delete/:id',asyncWrapper(adminController.hardDeleteUser))
// adminRoute.get('/orders/getAll',)
// adminRoute.get('/orders/:id',)
// adminRoute.patch('/orders/:id',)
// adminRoute.post('/product/create',)
// adminRoute.get('/product/getAll',)
// adminRoute.get('/product/:id',)
// adminRoute.patch('/product/:id',)
// adminRoute.delete('/product/:id',)

export default adminRoute