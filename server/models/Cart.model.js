import mongoose from 'mongoose';


const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    size: {
        type: String, required: true
    },
    selected: {
        type: Boolean,
        default: false
    }
})

const Cart = mongoose.model("Cart", CartSchema)

export default Cart;