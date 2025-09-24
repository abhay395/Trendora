import Order from "../models/Order.model.js"
import Address from '../models/Address.model.js'
import Cart from '../models/Cart.model.js'
import ApiError from "../utils/ApiError.js"
import Product from "../models/Product.model.js"
import razorpay from "../config/RazorConfig.js"
import crypto from 'crypto'
export default {
    checkoutProduct: async (userId, paymentMethod) => {
        try {

            // 1. Get selected address
            const selectedAddress = await Address.findOne({ userId, selected: true })
                .lean();
            if (!selectedAddress) {
                throw new ApiError(400, "Please select or add an address!");
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
            if (paymentMethod == "COD") {
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

                return order;
            } else if (paymentMethod === 'ONLINE') {
                const options = {
                    amount: totalPrice * 100,
                    currency: "INR",
                    receipt: "receipt_" + Date.now(),
                };
                const razorpayorder = await razorpay.orders.create(options)
                return {
                    ...razorpayorder,
                    selectedProduct,
                    totalPrice,
                    address: selectedAddress
                }
            }
        } catch (error) {
            throw error;
        }
    },
    verifyPayment: async (data) => {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            userId,
            selectedProduct,
            totalPrice,
            selectedAddress, paymentMethod
        } = data
        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");
        if (expectedSignature != razorpay_signature) throw new ApiError(400, 'Payment verification failed')
        let estimateDeliveryDate = new Date()
        estimateDeliveryDate.setDate(estimateDeliveryDate.getDate() + 5);
        const fullAddress = await Address.findById(selectedAddress).select('-_id')
        const order = await Order.create({
            address: fullAddress,
            userId,
            items: selectedProduct,
            paymentMethod,
            totalPrice,
            estimateDeliveryDate,
            paymentStatus: "paid"
        });
        let bulkStockUpdates = [];
        for (let product of selectedProduct) {
            bulkStockUpdates.push({
                updateOne: {
                    filter: { _id: product._id },
                    update: {
                        $inc: { "sizes.$[elem].quantity": -product.quantity },
                    },
                    arrayFilters: [{ "elem.size": product.size }]
                }
            })
        }
        // 6. Update stock and clear cart in parallel
        await Promise.all([
            Product.bulkWrite(bulkStockUpdates),
            Cart.deleteMany({ userId: userId, selected: true })
        ]);
        return order
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