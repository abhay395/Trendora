import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError.js";
class UnauthenticatedError extends ApiError {
  constructor(message = "Not authorized to access this route") {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;