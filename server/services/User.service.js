import mongoose from "mongoose"
import User from "../models/User.model.js"

export default {
    getUserInfo: async (userId) => {
        try {
            const result = await User.findById(userId)
            return result
        } catch (error) {
            throw error
        }
    },
    getUserAllInfo: async (userId) => {
        try {
            const result = await User.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: "orders",
                        localField: "_id",
                        foreignField: "userId",
                        as: "orders"
                    }
                },
                {
                    $lookup: {
                        from: "carts",
                        let: { userId: '$_id' },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$userId", "$$userId"] } } },
                            {
                                $lookup: {
                                    from: "products",
                                    let: { pid: "$productId" },
                                    pipeline: [
                                        { $match: { $expr: { $eq: ["$_id", "$$pid"] } } },
                                        {
                                            $lookup: {
                                                from: "images",
                                                localField: "images",
                                                foreignField: "_id",
                                                as: 'images'
                                            }
                                        },
                                        { $project: { title: 1, price: 1, 'images.url': 1, category: 1, sizes: 1 } }
                                    ],
                                    as: "productId"
                                }
                            },
                            {
                                $unwind: "$productId"
                            }
                        ],
                        as: "carts"
                    }
                },
                {
                    $lookup: {
                        from: "addresses",
                        localField: "_id",
                        foreignField: "userId",
                        as: "addresses"
                    }
                },
                {
                    $addFields: {
                        totalSpents: {
                            $sum: {
                                $map: {
                                    input: '$orders',
                                    as: 'o',
                                    in: '$$o.totalPrice'
                                }
                            }
                        },
                        totalProductInCart: {
                            $size: "$carts"
                        },
                    }
                }

            ])
            return result[0]
        } catch (error) {
            throw error
        }
    },
    updateUserProfile: async (updateBody, userId) => {
        try {
            let result = await User.findByIdAndUpdate(userId, updateBody, { new: true });
            return result
        } catch (error) {
            throw error
        }
    }
}