import User from '../models/User.model.js'
import Order from '../models/Order.model.js'
import Product from '../models/Product.model.js'
import { getPagination, getSort } from '../utils/helper.js'
import ApiError from '../utils/ApiError.js'


export default {
    getUser: async (filter, option) => {
        let query = {}
        if (filter?.search) {
            query.$or = [
                { name: { $regex: filter.search, $options: "i" } },
                { email: { $regex: filter.search, $options: "i" } },
                { phone: { $regex: filter.search, $options: "i" } },
            ]
        }
        const totalItems = await User.countDocuments(query);
        const { skip, totalPages, limit, page } = getPagination({ totalItems, limit: filter?.limit, page: filter?.page })
        const sortOptions = getSort(option.sortBy)
        const results = await User.find(query).sort(sortOptions).skip(skip).limit(limit).select('-refreshToken -password')
        return { results, totalItems, totalPages, page, limit }
    },
    getUserById: async (id) => {
        try {
            let result = await User.findById(id);
            if (!result) {
                throw new ApiError(404, "User not found", null);
            }
        } catch (error) {
            throw error
        }
    },
    createUser: async (body) => {
        try {
            if (!await User.find({ $or: [{ email: body?.email }, { phone: body?.phone }] })) {
                throw new ApiError(400, "This email is already used")
            }
            let result = await User.create(body);
            return result
        } catch (error) {
            throw error
        }
    },
    updateUser: async (id, updateBody) => {
        try {
            if (!await User.findById(id)) {
                throw new ApiError(400, "User not found")
            }
            if (!await User.find({
                _id: { $ne: id },
                $or: [
                    { email: updateBody?.email },
                    { phone: updateBody?.phone }
                ]
            })) {
                throw new ApiError(400, "This Number or email is already taken")
            }
            let result = await User.findByIdAndUpdate(id, updateBody)
            return result
        } catch (error) {
            throw error
        }
    },
    softeDeleteUser: async (id) => {

    },
    hardDeleteUser: async (id) => {
        try {
            if (!await User.findById(id)) {
                throw new ApiError(404, "User not found")
            }
            await User.findByIdAndDelete(id);
        } catch (error) {
            throw error
        }
    },
    getOrder: async (filter, option) => {
        
    },
    getOrderById: async (id) => {

    },
    updateOrder: async (id, updateBody) => {

    },
    createProduct: async (body) => {

    },
    getProducts: async (filter, option) => {

    },
    getProductById: async (id) => {

    },
    updatePorductId: async (id, updateBody) => {

    },
    deleteProduct: async (id) => {

    }

}