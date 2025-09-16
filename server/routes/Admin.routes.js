import express from 'express'
import asyncWrapper from '../middleware/async.js';
import adminController from '../controller/Admin.controller.js';
import upload from '../middleware/memory.multer.js';
import uploadForCsv from '../middleware/disk.multer.js'
import authenticationMiddleware, { autherizedRole } from '../middleware/auth.js';
let adminRoute = express.Router();


adminRoute.get('/dashboard-statics', authenticationMiddleware, autherizedRole(['admin', 'superadmin']), asyncWrapper(adminController.getDashBoard));
//*--------------------------------------------------------------------------USER API---------------------------------------------------------------------------\\

adminRoute.get('/users', authenticationMiddleware, autherizedRole(['admin', 'superadmin']), asyncWrapper(adminController.getUser))
adminRoute.get('/user/:id', authenticationMiddleware, autherizedRole(['admin', 'superadmin']), asyncWrapper(adminController.getUserById))
adminRoute.post('/user/create', authenticationMiddleware, autherizedRole(['superadmin']), asyncWrapper(adminController.createUser))
adminRoute.patch('/user/update/:id', authenticationMiddleware, autherizedRole(['admin', 'superadmin']), asyncWrapper(adminController.updateUser))
adminRoute.delete('/user/hard-delete/:id', authenticationMiddleware, autherizedRole(['superadmin']), asyncWrapper(adminController.hardDeleteUser))
adminRoute.delete('/user/soft-delete/:id', authenticationMiddleware, autherizedRole(['admin', 'superadmin']), asyncWrapper(adminController.softeDeleteUser))

//*--------------------------------------------------------------------------Order API---------------------------------------------------------------------------\\

adminRoute.get('/orders/export', authenticationMiddleware, autherizedRole(['admin', 'superadmin']), asyncWrapper(adminController.downloadOrder))
adminRoute.get('/orders', authenticationMiddleware, autherizedRole(['admin', 'superadmin']), asyncWrapper(adminController.getOrder))
adminRoute.get('/orders/:id', authenticationMiddleware, autherizedRole(['admin', 'superadmin']), asyncWrapper(adminController.getOrderById))
adminRoute.patch('/order/update/:id', authenticationMiddleware, autherizedRole(['admin', 'superadmin']), asyncWrapper(adminController.updateOrder))

//*--------------------------------------------------------------------------Product API---------------------------------------------------------------------------\\

adminRoute.post('/product/create', authenticationMiddleware, autherizedRole(['admin', 'superadmin']), upload.array('images', 5), asyncWrapper(adminController.createProduct))
adminRoute.post('/product/bulk-upload', authenticationMiddleware, autherizedRole(['admin', 'superadmin']), uploadForCsv.single('file'), asyncWrapper(adminController.bulkUpload))
adminRoute.get('/products', authenticationMiddleware, autherizedRole(['admin', 'superadmin']), asyncWrapper(adminController.getProducts))
adminRoute.get('/product/:id', authenticationMiddleware, autherizedRole(['admin', 'superadmin']), asyncWrapper(adminController.getProductById))
adminRoute.patch('/product/update/:id', authenticationMiddleware, autherizedRole(['admin', 'superadmin']), upload.array("images"), asyncWrapper(adminController.updateProductId))
adminRoute.delete('/product/:id', authenticationMiddleware, autherizedRole(['superadmin']), asyncWrapper(adminController.deleteProduct))
adminRoute.delete('/product/soft-delete/:id', authenticationMiddleware, autherizedRole(['admin', 'superadmin']), asyncWrapper(adminController.softDelteProduct))

export default adminRoute