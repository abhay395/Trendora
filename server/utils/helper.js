
import jwt from "jsonwebtoken";
const sendSuccessMessage = (res, status, message, result = null) => {
    res.status(status).json({ message: message, result: result, success: true })
}
const JWT_SECRET = process.env.JWT_SECRET || "Your Secret Secret Key";
const createToken = (user) => {
    return jwt.sign(
        { _id: user._id, email: user.email, name: user.name },
        JWT_SECRET,
        {
            expiresIn: "1y",
        }
    );
};

export {sendSuccessMessage,createToken}