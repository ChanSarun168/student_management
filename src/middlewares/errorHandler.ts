import { Request, Response, NextFunction } from "express";
import { BaseCustomError } from "../utils/customError";

// Global error handler middleware
function errorHandler(
  err: BaseCustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  // Send response to client
  res.status(statusCode).json({
    statusCode: statusCode,
    message: err.message,
  });
  next();
}


export { errorHandler };