import { NextFunction, Request, Response } from "express";
import z, { ZodError, ZodSchema } from "zod";
import { BaseCustomError } from "../utils/customError";

// Middleware function for validating user data using Zod schema
export const validateInputData = (ValidatinSchema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      ValidatinSchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // If it's a ZodError, handle it properly
        const errorMessages = error.errors.map((err) => err.message); // Extract error messages
        const customError = new BaseCustomError(errorMessages, 400);
        // console.error("Validation Error:", error.errors); // Log the validation error
        return next(customError);
      } else {
        // If it's another type of error, handle it accordingly
        console.error("Unknown Error:", error); // Log the unknown error
        return next(error);
      }
    }
  };
};