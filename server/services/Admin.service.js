import User from '../models/User.model.js'
import Order from '../models/Order.model.js'
import Product from '../models/Product.model.js'
import { getPagination, getSort } from '../utils/helper.js'
import ApiError from '../utils/ApiError.js'
import uploadToCloudinary from '../utils/cloudinary.js'
import fs from 'fs'
import csv from 'csv-parser'
import Category from '../models/Category.model.js'
import Image from '../models/Image.model.js'
import mongoose from 'mongoose'



function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => results.push(row))
            .on("end", () => resolve(results))
            .on("error", reject);
    });
}
export default {
    getDashBoard: async () => {
        try {
            // Run queries in parallel
            const [
                totalProduct,
                orders,
                saleGraph,
                topCategory,
                stockAlert,
                totalUser
            ] = await Promise.all([
                Product.countDocuments(),
                Order.find({}, "totalPrice").lean(),
                Order.aggregate([
                    {
                        $group: {
                            _id: { $dateToString: { format: "%m-%d", date: "$createdAt" } },
                            totalSales: { $sum: "$totalPrice" }
                        }
                    },
                    { $sort: { _id: 1 } }
                ]),
                Order.aggregate([
                    { $unwind: "$items" },
                    {
                        $group: {
                            _id: "$items.category",
                            totalSold: { $sum: "$items.quantity" },
                            totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
                        }
                    },
                    {
                        $lookup: {
                            from: "categories",
                            localField: "_id",
                            foreignField: "_id",
                            as: "categoryInfo"
                        }
                    },
                    { $unwind: "$categoryInfo" },
                    {
                        $project: {
                            _id: 0,
                            categoryId: "$_id",
                            name: "$categoryInfo.name",
                            totalSold: 1,
                            totalRevenue: 1
                        }
                    },
                    { $sort: { totalRevenue: -1 } } // optional: sort by revenue
                ]),
                Product.aggregate([
                    {
                        $project: {
                            title: 1,
                            sizes: {
                                $filter: {
                                    input: "$sizes",
                                    as: "size",
                                    cond: { $lte: ["$$size.quantity", 5] }
                                }
                            }
                        }
                    },
                    { $unwind: "$sizes" },
                    {
                        $project: {
                            title: 1,
                            size: "$sizes.size",
                            quantity: "$sizes.quantity"
                        }
                    }
                ]),
                User.countDocuments()
            ]);

            // Total sales + orders from cached orders
            const totalSales = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);
            const totalOrders = orders.length;

            const stats = {
                totalProduct,
                totalSales,
                totalOrders,
                totalUser
            };

            return {
                stats,
                currency: "₹",
                saleGraph,
                topCategory,
                stockAlert
            };
        } catch (error) {
            console.error("Dashboard Error:", error);
            throw error;
        }
    },
    getUser: async (filter, option) => {
        try {
            let query = {}
            if (filter?.search) {
                query.$or = [
                    { name: { $regex: filter.search, $options: "i" } },
                    { email: { $regex: filter.search, $options: "i" } },
                    { phone: { $regex: filter.search, $options: "i" } },
                ]
            }
            const totalItems = await User.countDocuments(query);
            const { skip, totalPages, limit, page } = getPagination({ totalItems, limit: filter?.limit, page: filter?.page })
            const sortOptions = getSort(option.sortBy)
            const results = await User.aggregate([
                {
                    $match: query
                },
                {
                    $sort: sortOptions
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
            ])
            return { results, totalItems, totalPages, page, limit }
        } catch (error) {
            throw error
        }
    },
    getUserById: async (id) => {
        try {
            // let result = await User.findById(id).select('-password -refreshToken');
            let result = await User.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId("68c93919b2600be401726235") } },
                {
                    $lookup: {
                        from: "orders",
                        let: { userId: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ['$userId', "$$userId"] }
                                }
                            }, {
                                $sort: {
                                    createdAt: -1
                                }
                            }
                        ],
                        as: "orders"
                    }
                },
                {
                    $lookup: {
                        from: "carts",
                        let: { userId: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: ['$userId', "$$userId"]
                                }
                            },
                            {
                                $lookup: {
                                    from: 'products',
                                    let: { pid: '$productId' },
                                    pipeline: [
                                        { $match: { $expr: ['$productId', "$$pid"] } },
                                        {
                                            $lookup: {
                                                from: 'images',
                                                localField: 'images',
                                                foreignField: '_id',
                                                as: 'images'
                                            }
                                        },
                                        {
                                            $project: {
                                                image: {
                                                    $arrayElemAt: ['$images.url', 0]
                                                },
                                                title: 1,
                                                price: 1,
                                                category: 1, sizes: 1
                                            }
                                        }
                                    ],
                                    as: 'productId'
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
                    $addFields: {
                        totalOrder: {
                            $size: "$orders"
                        },
                        totalSpent: {
                            $reduce: {
                                input: "$orders",
                                initialValue: 0,
                                in: {
                                    $cond: {
                                        if: {
                                            $and: [{ $eq: ["$$this.paymentStatus", "paid"] },
                                            { $ne: ["$$this.status", "cancelled"] }]
                                        },
                                        then: { $add: ["$$value", "$$this.totalPrice"] },
                                        else: '$$value'
                                    }
                                }
                            }
                        },
                        lastOrderDate: {
                            $arrayElemAt: ['$orders.createdAt', 0]
                        }
                    }
                }
            ])
            return result
        } catch (error) {
            throw error
        }
    },
    createUser: async (body) => {
        try {
            if (await User.findOne({ $or: [{ email: body?.email }, { phone: body?.phone }] })) {
                throw new ApiError(400, "This email is already used")
            }
            let result = new User(body);
            await result.save()
            result = await User.findById(result._id).select('-password');
            return result
        } catch (error) {
            throw error
        }
    },
    updateUser: async (id, updateBody) => {
        try {
            if (!await User.findById(id)) {
                throw new ApiError(400, "User not found")
            }
            if (await User.findOne({
                _id: { $ne: id },
                $or: [
                    { email: updateBody?.email },
                    { phone: updateBody?.phone }
                ]
            })) {
                throw new ApiError(400, "This Number or email is already taken")
            }
            let result = await User.findByIdAndUpdate(id, updateBody, { new: true })
            return result
        } catch (error) {
            throw error
        }
    },
    softeDeleteUser: async (id) => {
        try {
            if (!await User.findOne({ _id: id, isDeleted: false })) {
                throw new ApiError(404, "User not found")
            }
            let result = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
            return result;
        } catch (error) {
            throw error
        }
    },
    hardDeleteUser: async (id) => {
        try {
            if (!await User.findById(id)) {
                throw new ApiError(404, "User not found")
            }
            await User.findByIdAndDelete(id);
        } catch (error) {
            throw error
        }
    },
    getOrder: async (filter, option) => {
        try {
            let query = {}
            if (filter?.search) {
                query.$or = [
                    { "address.name": { $regex: filter.search, $options: "i" } },
                    { "address.phone": { $regex: filter.search, $options: "i" } },
                ]
                // query.user = { $in: user.map(u => u._id) }
            }
            for (let [key, value] of Object.entries(filter)) {
                if (key != 'search' && key != 'startDate' && key != "endDate") query[key] = value
            }
            if (filter?.startDate && filter?.endDate) {
                query["$and"] = [{ createdAt: { $gte: new Date(filter.startDate) } }, { createdAt: { $lte: new Date(filter.endDate) } }]
            }
            const totalItems = await Order.countDocuments(query);
            const { skip, totalPages, limit, page } = getPagination({ totalItems, limit: option?.limit, page: option?.page })
            const sortOptions = getSort(option.sortBy)
            const results = await Order.find(query).sort(sortOptions).skip(skip).limit(limit).select('items status totalPrice paymentStatus deliveredAt estimateDeliveryDate createdAt address')
            return { results, totalItems, totalPages, page, limit }
        } catch (error) {
            throw error
        }
    },
    getOrderById: async (id) => {
        try {
            let result = await Order.findById(id).populate({ path: 'userId', select: '-password -refreshToken' });
            if (!result) {
                throw new ApiError(404, "Order not found");
            }
            return result;
        } catch (error) {
            throw error
        }
    },
    updateOrder: async (id, updateBody) => {
        try {
            if (!await Order.findById(id)) {
                throw new ApiError(404, "Order not found")
            }
            let result = await Order.findByIdAndUpdate(id, updateBody, { new: true }).populate({ path: 'userId', select: '-password -refreshToken' });
            return result
        } catch (error) {
            throw error
        }
    },
    downloadOrderData: async (filter, option) => {
        try {
            let query = {};
            if (filter?.startDate && filter?.endDate) {
                query.$and = [{ createdAt: { $gte: new Date(filter?.startDate) } }, { createdAt: { $lte: new Date(filter?.endDate) } }]
            }
            let result = await Order.aggregate([
                {
                    $match: query,
                },
                {
                    $project: {
                        Customer: "$address.name",
                        Id: { $toString: "$_id" },
                        Phone: "$address.phone",
                        Date: "$createdAt",
                        Total: "$totalPrice",
                        Payment: "$paymentStatus",
                        Status: '$status',
                        _id: 0
                    }
                }
            ])
            return result
        } catch (error) {
            throw error
        }
    },
    createProduct: async (files, body) => {
        try {
            const images = await Promise.all(files.map(async (file) => {
                let image = await uploadToCloudinary({ file })
                image = await Image.create({ url: image?.secure_url })
                return image._id
            }))
            let result = new Product({ images: images, ...body })
            await result.save()
            result = await result.populate('images')
            // result = await Product.findById(result._id).populate('images.image');
            return result;
        } catch (error) {
            throw new ApiError(400, "Product creation failed: " + (error.message || error));
        }
    },
    bulkUpload: async (file) => {
        try {
            let data = await readCSV(file.path)
            let product = []
            // // console.log(data)
            data = await Promise.all(data.map(async (item) => {
                try {
                    const imageDocs = await Image.insertMany(
                        item.images.split(";").map((img) => {
                            let url = img.split("n_320w$&wid=317")
                            url = url.join("n_750w$&wid=750")
                            return { url }
                        })
                    );
                    const images = imageDocs.map((img) => img._id);

                    const category = await Category.findOneAndUpdate(
                        { name: item.category },
                        { $setOnInsert: { name: item.category } },
                        { new: true, upsert: true }
                    );
                    let sizes = JSON.parse(item.sizes)
                    product.push({
                        title: item.title,
                        category: category._id,
                        gender: item.gender,
                        description: item.description,
                        images,
                        sizes
                    })
                } catch (error) {
                    throw error
                }
            }))
            fs.unlinkSync(file?.path)
            let results = await Product.insertMany(product)
            // const results = await Product.find({ _id: { $in: productId } }).populate('category').populate('images')
            return {
                results, totalItems: results.length
            }
        } catch (error) {
            throw error
        }
    },
    getProducts: async (filter = {}, option = {}) => {
        try {
            let query = {};
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
            if (filter?.search) {
                query.$or = [
                    { title: { $regex: filter.search, $options: "i" } },
                    { description: { $regex: filter.search, $options: "i" } }
                ];
            }
            if (filter?.isDeleted) {
                query.isDeleted = filter.isDeleted === 'true';
            }
            const totalProduct = await Product.countDocuments(query);
            const { skip, totalPages, limit, page } = getPagination({ totalItems: totalProduct, limit: option?.limit, page: option?.page })
            const sortBy = getSort(option.sortBy)
            let result = await Product.find(query).sort(sortBy).skip(skip).limit(limit).populate('category').populate('images');;
            return { results: result, totalProduct, totalPages, page, limit }
        } catch (error) {
            throw error
        }
    },
    getProductById: async (id) => {
        try {
            let result = await Product.findById(id).populate('images');
            if (!result) {
                throw new ApiError(404, "Product not found", null)
            }
            return result;
        } catch (error) {
            throw error
        }
    },
    updateProductId: async (id, updateBody, files) => {
        try {
            if (!await Product.findById(id)) {
                throw new ApiError(404, "Product not found", null)
            }
            // console.log(Object.entries(updateBody.recordOfId))
            if (files && files.length > 0) {
                // console.log(updateBody.recordOfId)
                await Promise.all(updateBody.recordOfId.map(async (item) => {
                    try {
                        let img = await uploadToCloudinary({ file: files[item.idx] })
                        if (img) await Image.findByIdAndUpdate(item.oldId, { url: img?.secure_url })
                    } catch (error) {
                        throw error
                    }
                }))
                delete updateBody.recordOfId
            }
            let result = await Product.findByIdAndUpdate(id, updateBody, { new: true }).populate('category').populate('images');
            return result
        } catch (error) {
            throw error
        }
    },
    deleteProduct: async (id) => {
        try {
            if (!await Product.findOne({ _id: id })) {
                throw new ApiError(404, "Product not found", null);
            }
            await Product.findByIdAndDelete(id)
        } catch (error) {
            throw error
        }
    },
    softDelteProduct: async (id) => {
        try {
            if (!await Product.findOne({ _id: id, isDeleted: false })) {
                throw new ApiError(404, "Product not found", null);
            }
            await Product.findByIdAndUpdate(id, { isDeleted: true });
        } catch (error) {
            throw error
        }
    }
}