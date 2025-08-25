import CategoryService from "../services/Category.service.js"
import { sendSuccessMessage, pick } from '../utils/helper.js'
// import pick
export default {
    getCategories: async (req, res) => {
        const filter = pick(req.query, ["search", "createdAt"])
        const option = pick(req.query, ['sortBy', "page", "limit"])
        const result = await CategoryService.getCategories(filter, option)
        sendSuccessMessage(res, 200, "Category fetched Successfully", result)
    },
    addCategory: async (req, res) => {
        const { body } = req
        const result = await CategoryService.addCategory(body)
        sendSuccessMessage(res, 201, "Category created Successfully", result)
    },
    deleteCategory: async (req, res) => {
        const { id } = req.params
        await CategoryService.deleteCategory(id)
        sendSuccessMessage(res, 200, "Category deleted Successfully")
    },
    updateCategory: async (req, res) => {
        const { id } = req.params
        const { body } = req
        const result = await CategoryService.updateCategory(body, id)
        sendSuccessMessage(res, 200, "Category updated Successfully", result)
    },
}