import { validationResult } from 'express-validator';
import ApiError from '../utils/ApiError.js';

const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format errors for the response
    const extractedErrors = errors.array().map(err => ({ [err.path]: err.msg }));

    return next(new ApiError(400, "Validation Failed", extractedErrors));
  };
};

export default validate;
