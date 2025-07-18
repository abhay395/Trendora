import mongoose from 'mongoose'
import bcrypt from "bcrypt";
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
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
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
});
const Product = mongoose.model('User', productSchema);

export default Product