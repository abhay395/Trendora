import User from "../models/User.model.js";
import AuthServer from "../services/Auth.service.js"
import ApiError from "../utils/ApiError.js";
import { createToken, sendSuccessMessage } from "../utils/helper.js";
import dotenv from 'dotenv'
dotenv.config()
const clientUrl = process.env.VITESITEURL
export default {
    signUpUser: async (req, res) => {
        const result = await AuthServer.signUpUser(req.body);
        sendSuccessMessage(res, 201, "User Created Successfully", result);
    },
    googleCallBack: async (req, res) => {
        res.redirect(`${clientUrl}`)
    },
    loginUser: async (req, res) => {
        const result = await AuthServer.loginUser(req.body);
        sendSuccessMessage(res, 200, "User Logged in Successfully", result);
    },
    logoutUser: async (req, res) => {
        const result =  await AuthServer.logoutUser(req.user._id);
        sendSuccessMessage(res,200,"User Logout Successfully",result)
    },
    profileUser: async (req, res) => {
        const result = await AuthServer.profileUser(req.user._id);
        sendSuccessMessage(res, 200, "User data fetched", result)
    }
}