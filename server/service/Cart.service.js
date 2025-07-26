import Cart from '../models/Cart.model.js'
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
                select: "_id title images price gender sizes"
            }).select('productId quantity size').lean();
            // result = result.toObject();
            result.totalPrice = Math.floor(result.productId.price * result.quantity)
            return result;
        } catch (error) {
            throw error
        }
    },
    getCartProduct: async (userId) => {
        try {
            const product = await Cart.find({ userId: userId }).populate({ path: "productId", select: "_id title images price gender sizes" }).select('productId quantity size selected').lean()
            let result;
            result = product.map((item) => {
                // let obj = item.toObject()
                let price = item.productId.price;
                let quantity = item.quantity
                let totalPrice = Math.floor(price * quantity)
                return {
                    totalPrice,
                    ...item
                }
            });
            // result.totalPrice = product
            return result
        } catch (error) {
            throw error
        }
    },
    updateCart: async (cartId, updateBody) => {
        try {
            if (!await Cart.findById(cartId)) {
                throw new ApiError(404, "Cart Not Found", null);
            }
            let result = await Cart.findByIdAndUpdate(cartId, { $set: updateBody }, { new: true }).populate({ path: 'productId', select: "_id title images price gender" }).select('productId quantity size selected').lean()
            // result = result.toObject();
            result.totalPrice = Math.floor(result.productId.price * result.quantity)
            return result
        } catch (error) {
            throw error
        }
    },
    updateManyCartProduct: async (userId, updateBody) => {
        try {
            await Cart.updateMany({ userId }, updateBody)
            let result = await Cart.find({}).populate({ path: 'productId', select: "_id title images price gender" }).select('productId quantity size selected').lean();
            // console.log(result)
            result = result.map((item) => {
                // let obj = item.toObject()
                let price = item.productId.price;
                let quantity = item.quantity
                let totalPrice = Math.floor(price * quantity)
                return {
                    totalPrice,
                    ...item
                }
            });
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