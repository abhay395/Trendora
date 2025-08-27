import Category from "../models/Category.model.js"
import ApiError from "../utils/ApiError.js";
import { getPagination, getSort } from "../utils/helper.js";
export default {
    getCategories: async (filter, option) => {
        try {
            let query = {};
            if (filter?.search) {
                query.search = { name: { $regex: filter?.search } }
            }
            if (filter?.createdAt) {
                query.createdAt = { createdAt: new Date(filter?.createdAt) }
            }
            const totalItems = await Category.countDocuments(query)
            const { skip, totalPages, limit, page } = getPagination({ totalItems, limit: option.limit, page: option.page })
            const sortOptions = getSort(option?.sortBy || '')
            const results = await Category.find(query).sort(sortOptions).skip(skip).limit(limit)
            return { results, totalPages, page, limit, totalItems }
        } catch (error) {
            throw error
        }
    },
    addCategory: async (body) => {
        try {
            if (await Category.findOne({ name: body.name })) {
                throw new ApiError(400, "Category with this name already exists")
            }
            const result = new Category(body)
            await result.save()
            return result
        } catch (error) {
            throw error
        }
    },
    deleteCategory: async (id) => {
        try {
            if (!await Category.findById(id)) {
                throw ApiError(404, "Category not found")
            }
            await Category.findByIdAndDelete(id);
        } catch (error) {
            throw error
        }
    },
    updateCategory: async (updateBody, id) => {
        try {
            if (!await Category.findById(id)) {
                throw new ApiError(404, "Category not found");
            }
            const result = await Category.findByIdAndUpdate(id, updateBody, { new: true })
            return result
        } catch (error) {
            throw error
        }
    },
}