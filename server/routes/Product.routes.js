import express from 'express'
import ProductController from '../controller/Product.controller.js';
import asyncWrapper from '../middleware/async.js';
import upload from '../middleware/memory.multer.js';
const productRouter = express.Router();
productRouter.post('/create', asyncWrapper(ProductController.addMultipleProduct))
productRouter.get('/:productId/review', asyncWrapper(ProductController.getReview)) // Get Review
productRouter.post('/review/create', upload.array('files'), asyncWrapper(ProductController.createReview)) // create Review
productRouter.get('/', asyncWrapper(ProductController.getAllProduct))
productRouter.get('/filters', asyncWrapper(ProductController.getProductFilters))
productRouter.get('/:id', asyncWrapper(ProductController.getProductById))
productRouter.post('/:id', asyncWrapper(ProductController.updateProduct))
productRouter.delete('/:id', asyncWrapper(ProductController.deleteProductById))
// productRouter.delete('/delete',)
// productRouter.update('/delete',)
export default productRouter