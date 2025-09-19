import express from 'express'
import UserController from '../controller/User.controller.js';
import asyncWrapper from '../middleware/async.js';
import authenticationMiddleware from '../middleware/auth.js';
let userRouter = express.Router();

userRouter.get('/profile', authenticationMiddleware, asyncWrapper(UserController.getUserInfo))
userRouter.get('/profile-all-details', authenticationMiddleware, asyncWrapper(UserController.getUserAllInfo))
userRouter.patch('/profile/update', authenticationMiddleware, asyncWrapper(UserController.updateUserProfile))

export default userRouter