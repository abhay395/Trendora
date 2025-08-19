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
    rating: {
        type: Number,
        default: 0,
    },
    gender: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
    sizes: [
        {
            size: { type: String, required: true },  // e.g., S, M, L, XL
            quantity: { type: Number, default: 0, min: 0 },
            price: { type: Number, default: 0 },
            _id: false,
        }
    ],
    images: [
        {
            url: { type: String, required: true },
            _id: false,
        }
    ],
    isDeleted: {
        type: Boolean,
        default: false
    },
    review: [reviewSchema]
}, { timestamps: true });

productSchema.virtual('isOutOfStock').get(function () {
    return this.sizes.every(size => size.quantity === 0);
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

productSchema.index({ title: "text", description: "text" })

productSchema.plugin(paginate)
const Product = mongoose.model('Product', productSchema);

export default Product