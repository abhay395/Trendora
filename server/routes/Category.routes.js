import express from 'express'
import CategoryController from '../controller/Category.controller.js';
import asyncWrapper from '../middleware/async.js';
const categoryRoute = express.Router();


categoryRoute.get('/', asyncWrapper(CategoryController.getCategories));
categoryRoute.post('/', asyncWrapper(CategoryController.addCategory));
categoryRoute.delete('/:id', asyncWrapper(CategoryController.deleteCategory));
categoryRoute.patch('/:id', asyncWrapper(CategoryController.updateCategory));

export default categoryRoute;