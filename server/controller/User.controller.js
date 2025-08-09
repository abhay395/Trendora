import UserService from "../service/User.service.js"
import { sendSuccessMessage } from "../utils/helper.js";

export default {
    getUserInfo: async (req, res) => {
        const { _id } = req.user;
        let result = await UserService.getUserInfo(_id);
        sendSuccessMessage(res, 200, "User Profile Fetched successfull", result);
    },
    updateUserProfile: async (req, res) => {
        const { _id } = req.user;
        const { body } = req
        let result = await UserService.updateUserProfile(_id, body)
        sendSuccessMessage(res, 200, "User Profile Updated successfull", result);
    }
}