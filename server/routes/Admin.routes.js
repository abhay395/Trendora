import express from 'express'
import asyncWrapper from '../middleware/async.js';
import adminController from '../controller/Admin.controller.js';
import upload from '../middleware/memory.multer.js';
import uploadForCsv from '../middleware/disk.multer.js'
let adminRoute = express.Router();


adminRoute.get('/dashboard-statics', asyncWrapper(adminController.getDashBoard));
//*--------------------------------------------------------------------------USER API---------------------------------------------------------------------------\\

adminRoute.get('/users', asyncWrapper(adminController.getUser))
adminRoute.get('/user/:id', asyncWrapper(adminController.getUserById))
adminRoute.post('/user/create', asyncWrapper(adminController.createUser))
adminRoute.patch('/user/update/:id', asyncWrapper(adminController.updateUser))
adminRoute.delete('/user/hard-delete/:id', asyncWrapper(adminController.hardDeleteUser))
adminRoute.delete('/user/soft-delete/:id', asyncWrapper(adminController.softeDeleteUser))

//*--------------------------------------------------------------------------Order API---------------------------------------------------------------------------\\

adminRoute.get('/orders/export', adminController.downloadOrder)
adminRoute.get('/orders', asyncWrapper(adminController.getOrder))
adminRoute.get('/orders/:id', asyncWrapper(adminController.getOrderById))
adminRoute.patch('/order/update/:id', asyncWrapper(adminController.updateOrder))

//*--------------------------------------------------------------------------Product API---------------------------------------------------------------------------\\

adminRoute.post('/product/create', upload.array('images', 5), asyncWrapper(adminController.createProduct))
adminRoute.post('/product/bulk-upload', uploadForCsv.single('file'), asyncWrapper(adminController.bulkUpload))
adminRoute.get('/products', asyncWrapper(adminController.getProducts))
adminRoute.get('/product/:id', asyncWrapper(adminController.getProductById))
adminRoute.patch('/product/update/:id', upload.array("images"), asyncWrapper(adminController.updateProductId))
adminRoute.delete('/product/:id', asyncWrapper(adminController.deleteProduct))
adminRoute.delete('/product/soft-delete/:id', asyncWrapper(adminController.softDelteProduct))

export default adminRoute