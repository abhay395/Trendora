import Product from "../models/Product.model.js"
import Review from "../models/Review.modle.js";
import ApiError from "../utils/ApiError.js";
import uploadToCloudinary from "../utils/cloudinary.js";
import { getPagination, getSort } from "../utils/helper.js";


export default {
    getAllProduct: async (filter = {}, option = {}) => {
        try {
            let query = {}

            if (filter?.category) {
                let category = filter.category.split(',')
                query.category = { $in: category }
            }

            if (filter?.gender) {
                let genders = filter.gender.split(',')
                query.gender = { $in: genders }
            }

            if (filter?.size) {
                let sizes = filter.size.split(',')
                query.$or = sizes.map(size => ({
                    [`sizes.${size}`]: { $gt: 0 }
                }));
            }
            if (filter?.minPrice || filter?.maxPrice) {
                query.price = {};
                if (filter.minPrice) query.price.$gte = Number(filter.minPrice);
                if (filter.maxPrice) query.price.$lte = Number(filter.maxPrice);
            }
            if (filter?.rating) {
                query.rating = {};
                query.rating.$gte = Number(filter.rating);
            }
            if (filter?.search) {
                query.$or = [
                    { title: { $regex: filter.search, $options: "i" } },
                    { description: { $regex: filter.search, $options: "i" } }
                ];
            }
            query.isDeleted = false;
            const totalProduct = await Product.countDocuments(query);
            let limit = Number(option.limit || 10)
            let totalPages = Math.ceil(totalProduct / limit)
            let page = Math.min(totalPages, Number(option.page || 1))
            let skip = Math.max(0, (page - 1) * limit)
            console.log(skip, page, totalProduct)
            const sortOption = {
                priceAsc: { price: 1 },
                priceDesc: { price: -1 },
                ratingAsc: { rating: 1 },
                ratingDesc: { rating: -1 }
            }
            // Get min and max price from filtered products
            const priceStats = await Product.aggregate([
                { $match: query },
                {
                    $group: {
                        _id: null,
                        minPrice: { $min: "$price" },
                        maxPrice: { $max: "$price" }
                    }
                }
            ]);

            let results = await Product.find(query)
                .sort(sortOption[option.sortBy] || { rating: -1 })
                .skip(skip)
                .limit(limit).populate('category');
            // let results = await mongoQuery;
            return { results, totalProduct, totalPages, page, limit, priceStats };
        } catch (error) {
            throw error
        }
    },
    getProductById: async (id) => {
        try {
            if (!await Product.findById(id)) {
                throw new ApiError(404, "Product not found", null)
            }
            const result = await Product.findById(id);
            return result;
        } catch (error) {
            throw error
        }
    },
    getProductFilters: async () => {
        try {
            const category = await Product.distinct("category")
            const sizes = await Product.aggregate([
                {
                    $project: {
                        sizeKeys: { $objectToArray: "$sizes" }
                    }
                },
                {
                    $unwind: "$sizeKeys"
                },
                {
                    $group: {
                        _id: null,
                        sizes: { $addToSet: "$sizeKeys.k" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        sizes: 1
                    }
                }
            ]);
            const gender = await Product.distinct("gender")
            const priceStats = await Product.aggregate([
                {
                    $group: {
                        _id: null,
                        minPrice: { $min: "$price" },
                        maxPrice: { $max: "$price" }
                    }
                }
            ]);
            // console.log()

            let result = { ...sizes[0], categories: category.sort(), genders: gender.sort(), priceStats: priceStats[0] }
            return result;
        } catch (error) {
            throw error
        }
    },
    deleteProductById: async (id) => {
        try {
            if (!await Product.findById(id)) {
                throw new ApiError(404, "Product not found");
            }
            await Product.deleteOne({ _id: id })
        } catch (error) {
            throw error
        }
    },
    updateProduct: async (id, body) => {
        try {
            if (!await Product.findById(id)) {
                throw new ApiError(404, "Product not found");
            }
            const result = await Product.updateOne({ _id: id }, body)
            return result;
        } catch (error) {
            throw error
        }
    },
    addMultipleProduct: async (body) => {
        try {
            const result = await Product.create(body);
            return result
        } catch (error) {
            throw error
        }
    },
    createReview: async (files, body) => {
        try {
            if (files && files.length > 0) {
                const images = await Promise.allSettled(
                    files.map(async (file) => {
                        const res = await uploadToCloudinary({ file });
                        return { url: res?.secure_url || null };
                    })
                );
                body.images = images
                    .filter(img => img.status === "fulfilled")
                    .map(img => img.value);
            } else {
                body.images = [];
            }
            let result = new Review(body)
            await result.save()
            result = await Review.findById(result._id).populate({ path: 'userId', select: 'name' })
            const reivewsOfProduct = await Review.find({ productId: result.productId })
            let averageReviews = reivewsOfProduct.reduce((acc, r) => acc + r.rating, 0) / reivewsOfProduct.length
            averageReviews = Math.round(averageReviews * 100) / 100
            await Product.findByIdAndUpdate(result.productId, { rating: { count: reivewsOfProduct.length, average: averageReviews } })
            return result
        } catch (error) {
            throw error
        }
    },
    getReview: async (id, option) => {
        try {
            const totalItems = await Review.countDocuments({ productId: id })
            const sortOption = getSort(option.sortBy);
            const { skip, totalPages, limit, page } = getPagination({ totalItems: totalItems, limit: option?.limit, page: option?.page })
            const results = await Review.find({ productId: id }).sort(sortOption).skip(skip).limit(limit).populate({
                path: "userId",
                select: 'name'
            });
            return { results, limit, totalItems, totalPages, page }
        } catch (error) {
            throw error
        }
    },
    addHelpfulUser: async (reviewId, userId) => {
        try {
            if (await Review.findOne({ _id: reviewId, helpful: { $in: userId } })) {
                throw new ApiError(400, "This user Already added it's helpfull")
            }
            const result = await Review.findByIdAndUpdate(reviewId, { $push: { helpful: userId } }, { new: true })
            return result
        } catch (error) {
            throw error
        }
    }
}