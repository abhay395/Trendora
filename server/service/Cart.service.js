import Cart from '../models/Cart.mdoel.js'
import ApiError from '../utils/ApiError.js'

export default {
    createCart: async (userId, productId, quantity) => {
        try {
            const result = await Cart.create({ productId: productId, userId: userId, quantity: quantity });
            return result;
        } catch (error) {
            throw error
        }
    },
    getCartProduct: async (userId) => {
        try {
            const product = await Cart.find({ userId: userId }).populate({ path: "productId", select: "_id title images price gender" }).select('productId quantity ')
            let result;
            result = product.map((item) => {
                let obj = item.toObject()
                let price = item.productId.price;
                let quantity = item.quantity
                let totalPrice = price * quantity
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
            const result = await Cart.updateOne({ _id: cartId }, { $set: { quantity: quantity } })
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