"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputData = void 0;
const zod_1 = require("zod");
const customError_1 = require("../utils/customError");
// Middleware function for validating user data using Zod schema
const validateInputData = (ValidatinSchema) => {
    return (req, res, next) => {
        try {
            ValidatinSchema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                // If it's a ZodError, handle it properly
                const errorMessages = error.errors.map((err) => err.message); // Extract error messages
                const customError = new customError_1.BaseCustomError(errorMessages, 400);
                // console.error("Validation Error:", error.errors); // Log the validation error
                return next(customError);
            }
            else {
                // If it's another type of error, handle it accordingly
                console.error("Unknown Error:", error); // Log the unknown error
                return next(error);
            }
        }
    };
};
exports.validateInputData = validateInputData;
