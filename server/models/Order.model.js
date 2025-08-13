import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    address: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        pincode: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        fullAddress: { type: String, required: true }
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
        category: { type: String },
    }],
    status: {
        type: String,
        enum: ['pending', 'delivered', 'canceled'],
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