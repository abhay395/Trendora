import Product from "../models/Product.model.js"


export default {
    getAllProduct: async (filter, option) => {
        try {
            const result = Product.paginate(filter, option);
            return result;
        } catch (error) {
            
        }
    },
    getProductById: async (id) => {
        try {
            const result = Product.findById(id);
            return result;
        } catch (error) {
            
        }
    },
    deleteProductById: async () => {

    },
    updateProduct: async () => {

    }
}