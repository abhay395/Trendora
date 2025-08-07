import express from 'express';
import AuthController from '../controller/Auth.controller.js';
import authenticationMiddleware from '../middleware/auth.js';
import asyncWrapper from '../middleware/async.js';
const authRouter = express.Router();

authRouter.post('/signup', asyncWrapper(AuthController.signUpUser))
authRouter.get('/profile', authenticationMiddleware, asyncWrapper(AuthController.profileUser))
authRouter.post('/login', asyncWrapper(AuthController.loginUser))
authRouter.post('/logout', authenticationMiddleware, asyncWrapper(AuthController.logoutUser))

export default authRouter