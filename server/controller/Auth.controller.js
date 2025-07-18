import AuthServer from "../service/Auth.service.js"
import { sendSuccessMessage } from "../utils/helper.js";
export default {
    signUpUser: async (req, res) => {
        const result = await AuthServer.signUpUser(req.body);
        sendSuccessMessage(res, 201, "User Created Successfully", result);
    },
    loginUser: async (req, res) => {
        const result = await AuthServer.loginUser(req.body);
        sendSuccessMessage(res, 200, "User Logged in Successfully", result);
    },
    logoutUser: async (req, res) => {
        await AuthServer.logoutUser(req.user._id);
        sendSuccessMessage(res, 200, 'User Logout Successfully', null);
    }
}