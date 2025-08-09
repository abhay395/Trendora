import User from "../models/User.model.js"

export default {
    getUserInfo: async (userId) => {
        const result = await User.findById(userId).select("-password -refreshToken")
        return result
    },
    updateUserProfile: async (userId, updateBody) => {
        let result = await User.findByIdAndUpdate(userId, updateBody, { new: true });
        return result
    }
}