import Order from "../models/Order.model.js"
import Address from '../models/Address.model.js'
import Cart from '../models/Cart.model.js'
import ApiError from "../utils/ApiError.js"
import Product from "../models/Product.model.js"
import mongoose from "mongoose"
export default {
    checkoutProduct: async (userId, paymentMethod) => {
        try {
            let selectedAddress = await Address.findOne({ userId, selected: true }).select("name phone pincode city state fullAddress _id").lean();

            if (!selectedAddress) {
                throw new ApiError("Please select or add an address!");
            }

            let cartItems = await Cart.find({ userId, selected: true })
                .populate({
                    path: "productId",
                    select: "_id title images price gender sizes"
                })
                .select("productId quantity size")
                .lean();

            if (cartItems.length === 0) {
                throw new ApiError(400, "Cart is empty or no products selected");
            }

            let selectedProduct = [];

            for (let item of cartItems) {
                const product = item.productId;

                if (item.quantity > product.sizes[item.size]) {
                    throw new ApiError(400, `Insufficient stock for ${product.title} (${item.size})`);
                }

                selectedProduct.push({
                    productId: product._id,
                    title: product.title,
                    image: product.images[0].url,
                    price: product.price,
                    quantity: item.quantity,
                    size: item.size
                });
            }

            // Reduce stock without transaction
            const bulkOps = selectedProduct.map(item => ({
                updateOne: {
                    filter: { _id: item.productId },
                    update: {
                        $inc: {
                            [`sizes.${item.size}`]: -item.quantity
                        }
                    }
                }
            }));
            await Product.bulkWrite(bulkOps);

            const totalPrice = selectedProduct.reduce((sum, item) => sum + item.price * item.quantity, 0);

            const order = await Order.create({
                address: selectedAddress,
                userId,
                items: selectedProduct,
                paymentMethod,
                totalPrice
            });

            await Cart.deleteMany({ userId, selected: true });

            return order;
        } catch (error) {
            throw error;
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