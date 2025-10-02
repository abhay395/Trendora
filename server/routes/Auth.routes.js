import express from 'express';
import AuthController from '../controller/Auth.controller.js';
import authenticationMiddleware from '../middleware/auth.js';
import asyncWrapper from '../middleware/async.js';
import passport from 'passport';
import dotenv from 'dotenv'
dotenv.config()
const authRouter = express.Router();

authRouter.post('/signup', asyncWrapper(AuthController.signUpUser))
authRouter.get('/google-signup', passport.authenticate("google", { scope: ["profile", "email"] }))
authRouter.get('/google/callback', passport.authenticate("google", { failureRedirect: `${process.env.VITESITEURL}/login` }), asyncWrapper(AuthController.googleCallBack))
authRouter.get('/google-login', passport.authenticate("google", { scope: ["profile", "email"] }))
authRouter.post('/login', asyncWrapper(AuthController.loginUser))
authRouter.post('/logout', authenticationMiddleware, asyncWrapper(AuthController.logoutUser))

export default authRouter