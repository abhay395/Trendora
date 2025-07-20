import express from 'express'
import ProductController from '../controller/Product.controller.js';
import asyncWrapper from '../middleware/async.js';
const productRouter = express.Router();
productRouter.post('/create',asyncWrapper(ProductController.addMultipleProduct))
productRouter.get('/', asyncWrapper(ProductController.getAllProduct))
productRouter.get('/:id', asyncWrapper(ProductController.getProductById))
productRouter.post('/:id', asyncWrapper(ProductController.updateProduct))
productRouter.delete('/:id', asyncWrapper(ProductController.deleteProductById))
// productRouter.delete('/delete',)
// productRouter.update('/delete',)
export default productRouter