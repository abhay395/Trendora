import mongoose from 'mongoose'
import { paginate } from "./plugin/paginate.plugin.js";



let reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    images: [{
        url: String
    }]
}, { timestamps: true })
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
    },
    gender: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['T-shirt', 'Shirt', 'Jeans', 'Jacket', 'Shorts', 'Hoodie', "Coat"],
        required: true
    },
    sizes: {
        type: Map,
        of: Number,
        required: true,
        default: {
            S: 0,
            M: 0,
            L: 0,
            XL: 0,
        }
    },
    images: [
        {
            url: String,
        }
    ],
    isOutOfStock: {
        type: Boolean,
        default: false
    },
    review: [reviewSchema]
}, { timestamps: true });

productSchema.index({ title: "text", description: "text" })

productSchema.plugin(paginate)
const Product = mongoose.model('products', productSchema);

export default Product