import Order from "../models/Order.model.js"
import Address from '../models/Address.model.js'
import Cart from '../models/Cart.model.js'
import ApiError from "../utils/ApiError.js"
import Product from "../models/Product.model.js"
import mongoose from "mongoose"
export default {
    checkoutProduct: async (userId, paymentMethod) => {
        try {
            // 1. Get selected address
            const selectedAddress = await Address.findOne({ userId, selected: true })
                .lean();
            if (!selectedAddress) {
                throw new ApiError(400,"Please select or add an address!");
            }
            // 2. Get selected cart items with product info
            const cartItems = await Cart.find({ userId, selected: true })
                .populate({
                    path: "productId",
                    select: "_id title images gender sizes category"
                })
                .select("productId quantity size")
                .lean();

            if (cartItems.length === 0) {
                throw new ApiError(400, "Cart is empty or no products selected");
            }
            // 3. Validate and prepare selected products
            const selectedProduct = [];
            const bulkStockUpdates = [];

            for (const item of cartItems) {
                const product = item.productId;
                const availableQty = product.sizes.find((size) => size.size == item.size).quantity;

                if (item.quantity > availableQty) {
                    throw new ApiError(400, `Insufficient stock for ${product.title} (${item.size})`);
                }
                // console.log(product)
                selectedProduct.push({
                    productId: product._id,
                    title: product.title,
                    image: product.images[0].url,
                    price: product.sizes.find((size => size.size == item.size)).price,
                    quantity: item.quantity,
                    size: item.size,
                    category: product.category
                });
                bulkStockUpdates.push({
                    updateOne: {
                        filter: { _id: product._id },
                        update: {
                            $inc: { "sizes.$[elem].quantity": -item.quantity }
                        },
                        arrayFilters: [{ "elem.size": item.size }]
                    }
                });
            }
            // 4. Calculate total price
            const totalPrice = selectedProduct.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            // 5. Create order
            let estimateDeliveryDate = new Date()
            estimateDeliveryDate.setDate(estimateDeliveryDate.getDate() + 5);
            const order = await Order.create({
                address: selectedAddress,
                userId,
                items: selectedProduct,
                paymentMethod,
                totalPrice,
                estimateDeliveryDate
            });

            // 6. Update stock and clear cart in parallel
            await Promise.all([
                Product.bulkWrite(bulkStockUpdates),
                Cart.deleteMany({ userId, selected: true })
            ]);

            // 7. Check for out-of-stock products and update in bulk
            // const productIds = [...new Set(selectedProduct.map(p => p.productId.toString()))];
            // const updatedProducts = await Product.find({ _id: { $in: productIds } }).select("sizes").lean();

            // const bulkOutOfStockOps = updatedProducts.map(prod => {
            //     const totalQty = Object.values(prod.sizes || {}).reduce((sum, q) => sum + q, 0);
            //     return {
            //         updateOne: {
            //             filter: { _id: prod._id },
            //             update: { $set: { isOutOfStock: totalQty <= 0 } }
            //         }
            //     };
            // });

            // if (bulkOutOfStockOps.length > 0) {
            //     await Product.bulkWrite(bulkOutOfStockOps);
            // }
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