"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
// Global error handler middleware
function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    // Send response to client
    res.status(statusCode).json({
        statusCode: statusCode,
        message: err.message,
    });
    next();
}
