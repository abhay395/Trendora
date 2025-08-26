import mongoose from 'mongoose'
import { paginate } from "./plugin/paginate.plugin.js";
import Review from './Review.modle.js';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
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
    images: [{ type: mongoose.Types.ObjectId, ref: "Images" }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    rating: {
        average: { type: Number, default: 0 },  // e.g., 4.3
        count: { type: Number, default: 0 }     // e.g., 120 reviews
    }

}, { timestamps: true });


function autoPopulate(next) {
    this.populate("images");
    next();
}
productSchema.pre("find", autoPopulate);
productSchema.pre("findOne", autoPopulate);
productSchema.pre("findById", autoPopulate);
productSchema.virtual('isOutOfStock').get(function () {
    return this.sizes.every(size => size.quantity === 0);
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

productSchema.index({ title: "text", description: "text" })

productSchema.plugin(paginate)
const Product = mongoose.model('Product', productSchema);

export default Product