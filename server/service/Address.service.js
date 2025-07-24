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
    addAddress: async (reqBody) => {
        try {
            if(await Address.findOne({phone:reqBody.phone})){
                throw new ApiError(400,"This number already added")
            }
            let result = await Address.create(reqBody);
            return result;
        } catch (error) {
            throw error
        }
    },
    updateAddresssById: async (addressId,updateBody) => {
        try {
            console.log(addressId)
            if (!await Address.findById(addressId)) {
                throw new ApiError(404, "Address not found")
            }
            const result =  await Address.findByIdAndUpdate(addressId,updateBody,{new:true});
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