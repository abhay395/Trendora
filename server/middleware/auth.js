// import UnauthenticatedError from "../errors/unauthenticated.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.model.js";
import { config } from 'dotenv'
config()
const JWT_SECRET = process.env.JWT_SECRET || "Your_Secret_Secret_Key";
const authenticationMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"] || req.headers["Authorization"];
    if (!authorization) {
      return next(new ApiError(401, "No authorized to acces"));
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return next(new ApiError(401, "No authorized to acces"));
    }
    try {
      const verified = jwt.verify(token, JWT_SECRET);
      let user = await User.findById(verified?._id)
      if (!user) {
        return next(new ApiError(401, "No authorized to acces"));
      }
      req.user = user
      next();
    } catch (error) {
      next(new ApiError(401, "Invalid Token"));
    }
  } catch (error) {
    next(error)
  }
};
export const authenticationMiddlewareForSession = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  next(new ApiError(401, "No authorized to acces"))
}
export const autherizedRole = (role = []) => {
  return (req, res, next) => {
    if (!req?.user?.role || !role.includes(req.user.role)) {
      return next(new ApiError(403, "Access denied"))
    }
    next()
  }
}

export default authenticationMiddleware;
