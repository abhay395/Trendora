import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    address: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        street: {           // House number, street, or locality
            type: String,
            required: true
        },
        landmark: {         // Optional nearby landmark
            type: String
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true
        },
        title: { type: String, required: true },
        image: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        size: { type: String },
        category: { type: mongoose.Types.ObjectId, ref: "Category" },
    }],
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled",],
        default: 'pending'
    },
    totalPrice: {
        type: Number,
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "online"],
    },
    paymentStatus: {
        type: String,
        enum: ['paid', "unpaid"],
        default: "unpaid"
    },
    deliveredAt: {
        type: Date,
        default: null
    },
    estimateDeliveryDate: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema)
export default Order