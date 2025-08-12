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
            let result = await User.findById(id).select('-password -refreshToken');
            if (!result) {
                throw new ApiError(404, "User not found", null);
            }
            return result
        } catch (error) {
            throw error
        }
    },
    createUser: async (body) => {
        try {
            if (await User.findOne({ $or: [{ email: body?.email }, { phone: body?.phone }] })) {
                throw new ApiError(400, "This email is already used")
            }
            let result = new User(body);
            await result.save()
            result = await User.findById(result._id).select('-password');
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
            if (await User.findOne({
                _id: { $ne: id },
                $or: [
                    { email: updateBody?.email },
                    { phone: updateBody?.phone }
                ]
            })) {
                throw new ApiError(400, "This Number or email is already taken")
            }
            let result = await User.findByIdAndUpdate(id, updateBody, { new: true })
            return result
        } catch (error) {
            throw error
        }
    },
    softeDeleteUser: async (id) => {
        try {
            if (!await User.findOne({ _id: id, isDeleted: false })) {
                throw new ApiError(404, "User not found")
            }
            let result = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
            return result;
        } catch (error) {
            throw error
        }
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
        try {
            let query = {}
            if (filter?.search) {
                let user = await User.find({
                    $or: [
                        { name: { $regex: filter.search, $options: "i" } },
                        { email: { $regex: filter.search, $options: "i" } },
                        { phone: { $regex: filter.search, $options: "i" } },
                    ]
                })
                query.user = { $in: user.map(u => u._id) }
            }
            else if (filter?.status) {
                query.status = filter.status
            } else if (filter?.city) {
                query.city = filter.city
            }
            const totalItems = await Order.countDocuments(query);
            const { skip, totalPages, limit, page } = getPagination({ totalItems, limit: filter?.limit, page: filter?.page })
            const sortOptions = getSort(option.sortBy)
            const results = await Order.find(query).sort(sortOptions).skip(skip).limit(limit).populate({ path: 'userId', select: '-password -refreshToken' })
            return { results, totalItems, totalPages, page, limit }
        } catch (error) {
            throw error
        }
    },
    getOrderById: async (id) => {
        try {
            let result = await Order.findById(id).populate({ path: 'userId', select: '-password -refreshToken' });
            if (!result) {
                throw new ApiError(404, "Order not found");
            }
            return result;
        } catch (error) {
            throw error
        }
    },
    updateOrder: async (id, updateBody) => {
        try {
            if (!await Order.findById(id)) {
                throw new ApiError(404, "Order not found")
            }
            let result = await Order.findByIdAndUpdate(id, updateBody, { new: true }).populate({ path: 'userId', select: '-password -refreshToken' });
            return result
        } catch (error) {
            throw error
        }
    },
    createProduct: async (body) => {
        try {
            let result = new Product(body);
            await result.save();
            return result;
        } catch (error) {
            throw error
        }
    },
    getProducts: async (filter = {}, option = {}) => {
        try {
            let query = {};
            if (filter?.category) {
                let category = filter.category.split(',')
                query.category = { $in: category }
            }
            if (filter?.gender) {
                let genders = filter.gender.split(',')
                query.gender = { $in: genders }
            }
            if (filter?.size) {
                let sizes = filter.size.split(',')
                query.$or = sizes.map(size => ({
                    [`sizes.${size}`]: { $gt: 0 }
                }));
            }
            if (filter?.search) {
                query.$or = [
                    { title: { $regex: filter.search, $options: "i" } },
                    { description: { $regex: filter.search, $options: "i" } }
                ];
            }
            if (filter?.isDeleted) {
                query.isDeleted = filter.isDeleted === 'true';
            }
            const totalProduct = await Product.countDocuments(query);
            const { skip, totalPages, limit, page } = getPagination({ totalItems: totalProduct, limit: filter?.limit, page: filter?.page })
            const sortBy = getSort(option.sortBy)
            let result = await Product.find(query).sort(sortBy).skip(skip).limit(limit);
            return { results: result, totalProduct, totalPages, page, limit }
        } catch (error) {
            throw error
        }
    },
    getProductById: async (id) => {
        try {
            let result = await Product.findById(id);
            if (!result) {
                throw new ApiError(404, "Product not found", null)
            }
            return result;
        } catch (error) {
            throw error
        }
    },
    updateProductId: async (id, updateBody) => {
        try {
            if (!await Product.findById(id)) {
                throw new ApiError(404, "Product not found", null)
            }
            let result = await Product.findByIdAndUpdate(id, updateBody, { new: true });
            return result
        } catch (error) {
            throw error
        }
    },
    deleteProduct: async (id) => {
        try {
            if (!await Product.findOne({ _id: id, isDeleted: false })) {
                throw new ApiError(404, "Product not found", null);
            }
            await Product.findByIdAndUpdate(id, { isDeleted: true });
        } catch (error) {
            throw error
        }
    }
}