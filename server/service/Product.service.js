import Product from "../models/Product.model.js"
import ApiError from "../utils/ApiError.js";


export default {
    getAllProduct: async (filter, option) => {
        try {
            const result = await Product.paginate(filter, option);
            return result;
        } catch (error) {
            throw error
        }
    },
    getProductById: async (id) => {
        try {
            if (!await Product.findById(id)) {
                throw new ApiError(404, "Product not found", null)
            }
            const result = await Product.findById(id);
            return result;
        } catch (error) {

        }
    },
    deleteProductById: async (id) => {
        try {
            if (!await Product.findById(id)) {
                throw new ApiError(404, "Product not found");
            }
            await Product.deleteOne({ _id: id })
        } catch (error) {
            throw error
        }
    },
    updateProduct: async (id, body) => {
        try {
            if (!await Product.findById(id)) {
                throw new ApiError(404, "Product not found");
            }
            const result = await Product.updateOne({ _id: id }, body)
            return result;
        } catch (error) {
            throw error
        }
    },
    addMultipleProduct:async(body)=>{
        try {
            const result = await Product.create(body);
            return result
        } catch (error) {
            throw error
        }
    }
}