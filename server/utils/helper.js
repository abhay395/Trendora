
import jwt from "jsonwebtoken";
const sendSuccessMessage = (res, status, message, result = null) => {
    res.status(status).json({ message: message, result: result, success: true })
}
const JWT_SECRET = process.env.JWT_SECRET || "Your Secret Secret Key";
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
export { sendSuccessMessage, createToken, getPagination, getSort }