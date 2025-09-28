import express from 'express'
import UserController from '../controller/User.controller.js';
import asyncWrapper from '../middleware/async.js';
import authenticationMiddleware from '../middleware/auth.js';
import upload from '../middleware/memory.multer.js';
import passport from 'passport';
let userRouter = express.Router();

userRouter.get('/profile', authenticationMiddleware, asyncWrapper(UserController.getUserInfo))
userRouter.get('/avatar', asyncWrapper(UserController.userAvatar))
userRouter.get('/profile-all-details', authenticationMiddleware, asyncWrapper(UserController.getUserAllInfo))
userRouter.patch('/profile/update', upload.single('file'), authenticationMiddleware, asyncWrapper(UserController.updateUserProfile))

export default userRouter