import mongoose from 'mongoose'
import { paginate } from "./plugin/paginate.plugin.js";

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
    rating: {
        average: { type: Number, default: 0 },  // e.g., 4.3
        count: { type: Number, default: 0 }     // e.g., 120 reviews
    }

}, { timestamps: true });

productSchema.virtual('isOutOfStock').get(function () {
    return this.sizes.every(size => size.quantity === 0);
});

// productSchema.methods.updateRating = async function () { /// Use this function when you add any review on Product
//     if (this.review.length === 0) {
//         this.rating.average = 0;
//         this.rating.count = 0;
//     } else {
//         this.rating.count = this.review.length;
//         this.rating.average = this.review.reduce((acc, r) => acc + r.rating, 0) / this.rating.count;
//     }
//     await this.save();
// };


productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

productSchema.index({ title: "text", description: "text" })

productSchema.plugin(paginate)
const Product = mongoose.model('Product', productSchema);

export default Product