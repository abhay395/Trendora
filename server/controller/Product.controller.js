import ProductService from "../service/Product.service.js";
import { sendSuccessMessage } from "../utils/helper.js";
import { pick } from "../utils/pick.js";
export default {
    addMultipleProduct:async(req,res)=>{
        const result = await ProductService.addMultipleProduct(req.body);
        sendSuccessMessage(res,201,"Prodcut Created Successfully",result);
    },
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
        const { id } = req.params;
        await ProductService.deleteProductById(id);
        sendSuccessMessage(res, 200, "Product Deleted Successfully", null)
    },
    updateProduct: async (req, res) => {
        const { id } = req.params;
        const result = await ProductService.updateProduct(id, req.body);
        sendSuccessMessage(res, 200, "Product Updated Successfully", result)
    }
}