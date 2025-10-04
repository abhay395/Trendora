import Address from "../models/Address.model.js"
import ApiError from "../utils/ApiError.js";

export default {
    getAllAddress: async (userId) => {
        try {
            let result = await Address.find({ userId });
            return result;
        } catch (error) {
            throw error
        }
    },
    selectAddress: async (addressId, userId) => {
        try {
            let result = await Address.findByIdAndUpdate(addressId, { selected: true }, { new: true })
            await Address.updateMany({ _id: { $ne: addressId }, userId: userId }, { $set: { selected: false } })
            return result
        } catch (error) {
            throw error
        }
    },
    addAddress: async (reqBody) => {
        try {
            if (await Address.findOne({ phone: reqBody.phone })) {
                throw new ApiError(400, "This number already added")
            }
            let result = await Address.create(reqBody);
            return result;
        } catch (error) {
            throw error
        }
    },
    updateAddresssById: async (addressId, updateBody) => {
        try {
            if (!await Address.findById(addressId)) {
                throw new ApiError(404, "Address not found")
            }
            if (updateBody.phone && await Address.findOne({ _id: { $ne: addressId }, phone: updateBody.phone })) {
                throw new ApiError(400, "This number already added")
            }
            const result = await Address.findByIdAndUpdate(addressId, updateBody, { new: true });
            return result
        } catch (error) {
            throw error
        }
    },
    deleteAddressById: async (addressId) => {
        try {
            if (!await Address.findById(addressId)) {
                throw new ApiError(404, "Address not found")
            }
            await Address.findByIdAndDelete(addressId);
        } catch (error) {
            throw error
        }
    }
}