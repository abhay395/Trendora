import mongoose from "mongoose"
let reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
    },
    helpful: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    images: [{
        url: String
    }]
    , rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }

}, { timestamps: true })

const Review = mongoose.model('Review', reviewSchema)

export default Review