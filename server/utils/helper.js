import jwt from "jsonwebtoken";
import { config } from 'dotenv'
config()
const sendSuccessMessage = (res, status, message, result = null) => {
    res.status(status).json({ message: message, result: result, success: true })
}

const JWT_SECRET = process.env.JWT_SECRET || "Your_Secret_Secret_Key";
const createToken = (user) => {
    return jwt.sign(
        { _id: user._id, email: user.email, name: user.name, role: user.role },
        JWT_SECRET,
        {
            expiresIn: "1y",
        }
    );
};
function getPagination({ totalItems, limit = 10, page = 1 }) {
    limit = Math.max(1, limit);
    const totalPages = Math.ceil(totalItems / limit) || 1
    page = Math.min(Math.max(1, Number(page)), totalPages)
    const skip = (page - 1) * limit
    return {
        skip,
        totalPages,
        limit,
        page
    }
}
function getSort(sortString = '') {
    if (sortString == "") return { createdAt: -1 };
    const sortObj = {};
    sortString.split(',').forEach(filed => {
        const [key, order] = filed.split(':').map(s => s.trim());
        if (key) {
            sortObj[key] = order === "asc" ? 1 : -1
        }
    })
    return sortObj
}
const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

export { sendSuccessMessage, createToken, getPagination, getSort, pick }