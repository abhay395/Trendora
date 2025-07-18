import express from 'express'
import ProductController from '../controller/Product.controller.js';
import asyncWrapper from '../middleware/async.js';
const productRouter = express.Router();
productRouter.get('/',asyncWrapper(ProductController.getAllProduct))
productRouter.get('/:id',asyncWrapper(ProductController.getProductById))
// productRouter.post('/create',)
// productRouter.delete('/delete',)
// productRouter.update('/delete',)
export default productRouter