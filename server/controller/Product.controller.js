import ProductService from "../service/Product.service.js";
import { sendSuccessMessage } from "../utils/helper.js";
import { pick } from "../utils/pick.js";
export default {
    getAllProduct: async (req, res) => {
        const filter = pick(req.query, ["name", "isActive", "onlyExpired"]);
        const options = pick(req.query, ["sortBy", "limit", "page", "populate"]);
        const result = await ProductService.getAllProduct(filter, options);
        sendSuccessMessage(res, 200, "Products fetched successfully", result);
    },
    getProductById: async (req, res) => {
        const { id } = req.params
        const result = await ProductService.getProductById(id);
        sendSuccessMessage(res, 200, 'Product fetched successfully', result);
    },
    deleteProductById: async (req, res) => {

    },
    updateProduct: async (req, res) => {
    }
}