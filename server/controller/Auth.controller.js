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
        const { displayName, emails, photos } = req.user

        if (await User.isEmailTaken(emails[0].value)) {
            let user = await User.findOne({ email: emails[0].value })
            const token = createToken(user)
            user.isActive = true
            await user.save()
            return res.redirect(`${clientUrl}/?token=${token}`)
        }
        const user = new User({ name: displayName, email: emails[0].value, image: photos[0].value, isActive: true })
        await user.save()
        const token = createToken(user)
        res.redirect(`${clientUrl}/?token=${token}`)
    },
    loginUser: async (req, res) => {
        const result = await AuthServer.loginUser(req.body);
        sendSuccessMessage(res, 200, "User Logged in Successfully", result);
    },
    logoutUser: async (req, res) => {
        await AuthServer.logoutUser(req.user._id);
        sendSuccessMessage(res, 200, 'User Logout Successfully', null);
    },
    profileUser: async (req, res) => {
        const result = await AuthServer.profileUser(req.user._id);
        sendSuccessMessage(res, 200, "User data fetched", result)
    }
}