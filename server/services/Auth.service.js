import User from '../models/User.model.js'
import ApiError from '../utils/ApiError.js';
import { createToken } from '../utils/helper.js'
import bcrypt from "bcrypt";
export default {
    signUpUser: async (reqBody) => {
        try {
            if (await User.isEmailTaken(reqBody.email)) {
                throw new ApiError(400, "This Email is Already used");
            }
            const user = new User({ ...reqBody, isActive: true });
            await user.save();
            const result = createToken(user)
            return { token: result }
        } catch (error) {
            throw error
        }
    },
    loginUser: async (reqBody) => {
        try {
            const { email, password } = reqBody;
            const user = await User.findOne({ email })
            if (!user) {
                throw new ApiError(404, "Invalid Credentials");
            }
            if(!user.password){
                throw new ApiError(404, "Invalid Credentials");
            }
            const passwordCheck = await bcrypt.compare(password, user.password)
            if (!passwordCheck) {
                throw new ApiError(404, "Invalid Credentials");
            }
            await User.findByIdAndUpdate(user._id, { $set: { isActive: true } })
            const result = createToken(user)
            return { token: result }
        } catch (error) {
            throw error
        }
    },
    logoutUser: async (userId) => {
        try {
            await User.findByIdAndUpdate(userId, { isActive: false })
        } catch (error) {
            throw error
        }
    },
}