import Order from "../models/Order.model.js"
import Address from '../models/Address.model.js'
import Cart from '../models/Cart.model.js'
import ApiError from "../utils/ApiError.js"
import Product from "../models/Product.model.js"
export default {
    checkoutProduct: async (userId, paymentMethod) => {
        try {
            let selectedAddress = await Address.findOne({ userId, selected: true }).select(" name phone pincode city state fullAddress _id ").lean()
            if (!selectedAddress) {
                throw new ApiError("Please Selecte Address or Add!")
            }
            let cartItems = await Cart.find({ userId, selected: true }).populate({
                path: "productId",
                select: "_id title images price gender"
            }).select("productId quantity size").lean();
            if (cartItems.length == 0) {
                throw new ApiError(400, "Cart is Empty or Product Not Selected")
            }
            let selectedProduct = cartItems.map((item) => {
                let product = item.productId
                return {
                    productId: product._id,
                    title: product.title,
                    image: product.images[0].url,
                    price: product.price,
                    quantity: item.quantity,
                    size: item.size
                }
            })
            let totalPrice = selectedProduct.reduce((sum, item) => sum += item.price * item.quantity, 0)
            let order = await Order.create({ address: selectedAddress, userId, items: [...selectedProduct], paymentMethod, totalPrice })
            // for(let item of cartItems){
            //     await Product.findByIdAndUpdate(item.productId._id,{sizes[item.size]:})
            // }
            await Cart.deleteMany({ userId, selected: true })
            return order
        } catch (error) {
            throw error
        }
    },
    getOrders: async (userId) => {
        try {
            let result = await Order.find({ userId }).sort({ createdAt: -1 });
            return result;
        } catch (error) {
            throw error
        }
    },
    getOrderById: async (orderId) => {
        try {
            let result = await Order.findById(orderId)
            return result
        } catch (error) {
            throw error
        }
    }
}