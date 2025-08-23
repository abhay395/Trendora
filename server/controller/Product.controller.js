import ProductService from "../service/Product.service.js";
import { sendSuccessMessage, pick } from "../utils/helper.js";
export default {
    addMultipleProduct: async (req, res) => {
        const result = await ProductService.addMultipleProduct(req.body);
        sendSuccessMessage(res, 201, "Prodcut Created Successfully", result);
    },
    getAllProduct: async (req, res) => {
        const filter = pick(req.query, ["gender", "category", "size", "minPrice", "maxPrice", "search", "rating"]);
        const options = pick(req.query, ["sortBy", "limit", "page", "populate"]);
        const result = await ProductService.getAllProduct(filter, options);
        sendSuccessMessage(res, 200, "Products fetched successfully", result);
    },
    getProductById: async (req, res) => {
        const { id } = req.params
        const result = await ProductService.getProductById(id);
        sendSuccessMessage(res, 200, 'Product fetched successfully', result);
    },
    getProductFilters: async (req, res) => {
        const result = await ProductService.getProductFilters();
        sendSuccessMessage(res, 200, 'Filter fetched successfully', result);
    },
    deleteProductById: async (req, res) => {
        const { id } = req.params;
        await ProductService.deleteProductById(id);
        sendSuccessMessage(res, 200, "Product Deleted Successfully", null)
    },
    updateProduct: async (req, res) => {
        const { id } = req.params;
        const result = await ProductService.updateProduct(id, req.body);
        sendSuccessMessage(res, 200, "Product Updated Successfully", result)
    },
    createReview: async (req, res) => {
        const { body, files } = req
        body.userId = req.user._id
        console.log(body, files)
        const result = await ProductService.createReview(files, body);
        sendSuccessMessage(res, 200, "Reviwe Fetched Successfully", result)
    },
    getReview: async (req, res) => {
        const { productId } = req.params
        const option = pick(req.query, ['sortBy', 'page', 'limit'])
        console.log(option)
        const result = await ProductService.getReview(productId, option);
        sendSuccessMessage(res, 200, "Reviwe Fetched Successfully", result)
    }
}