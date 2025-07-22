import Cart from '../models/Cart.mdoel.js'
import ApiError from '../utils/ApiError.js'
import Product from '../models/Product.model.js'
export default {
    createCart: async (userId, productId, quantity, size) => {
        try {
            if (!await Product.findById(productId)) {
                throw new ApiError(404, "Product not found")
            }
            let createCart = await Cart.create({ productId: productId, userId: userId, quantity: quantity, size: size })
            let result = await Cart.findById(createCart._id).populate({
                path: "productId",
                select: "_id title images price gender"
            }).select('productId quantity size');
            result = result.toObject();
            result.totalPrice = Math.floor(result.productId.price * result.quantity)
            return result;
        } catch (error) {
            throw error
        }
    },
    getCartProduct: async (userId) => {
        try {
            const product = await Cart.find({ userId: userId }).populate({ path: "productId", select: "_id title images price gender" }).select('productId quantity size')
            let result;
            result = product.map((item) => {
                let obj = item.toObject()
                let price = item.productId.price;
                let quantity = item.quantity
                let totalPrice = Math.floor(price * quantity)
                return {
                    totalPrice,
                    ...obj
                }
            });
            // result.totalPrice = product
            return result
        } catch (error) {
            throw error
        }
    },
    updateCartQuantity: async (cartId, quantity) => {
        try {
            if (!await Cart.findById(cartId)) {
                throw new ApiError(404, "Cart Not Found", null);
            }
            let result = await Cart.findByIdAndUpdate(cartId, { $set: { quantity: quantity } }, { new: true }).populate({ path: 'productId', select: "_id title images price gender" }).select('productId quantity size')
            result = result.toObject();
            result.totalPrice = Math.floor(result.productId.price * result.quantity)
            return result
        } catch (error) {
            throw error
        }
    },
    RemoveProductFromCart: async (cartId) => {
        try {
            if (!await Cart.findById(cartId)) {
                throw new ApiError(404, "Cart Not Found", null);
            }
            await Cart.deleteOne({ _id: cartId })
        } catch (error) {
            throw error
        }
    }
}