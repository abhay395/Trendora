import UserService from "../services/User.service.js"
import uploadToCloudinary from "../utils/cloudinary.js";
import { sendSuccessMessage } from "../utils/helper.js";
import axios from 'axios'
export default {
    getUserInfo: async (req, res) => {
        const { _id } = req.user;
        let result = await UserService.getUserInfo(_id);
        sendSuccessMessage(res, 200, "User Profile Fetched successfull", result);
    },
    userAvatar: async (req, res) => {
        const googleImageUrl = req.query.url;
        console.log(googleImageUrl)
        const response = await axios.get(googleImageUrl, { responseType: "arraybuffer" });
        res.set('Content-Type', "image/jpeg")
        res.send(response.data);
    },
    getUserAllInfo: async (req, res) => {
        const { _id } = req.user;
        let result = await UserService.getUserAllInfo(_id);
        sendSuccessMessage(res, 200, "User Profile All details Fetched successfull", result);
    },
    updateUserProfile: async (req, res) => {
        const { _id } = req.user;
        const { body, file } = req
        console.log(file, body)
        if (file) {
            const res = await uploadToCloudinary({ file });
            body.image = res?.secure_url
        }
        let result = await UserService.updateUserProfile(body, _id);
        sendSuccessMessage(res, 200, "User Profile Updated successfull", result);
    }
}