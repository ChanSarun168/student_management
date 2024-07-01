"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCustomError = void 0;
class BaseCustomError extends Error {
    constructor(message, statusCode) {
        //console.log("status code in utils:" , statusCode);
        super(message); // Call the super constructor (Error class)
        this.statusCode = statusCode; // Custom property to hold status code
        this.name = this.constructor.name; // Set the name of the error to the class name
        Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
}
exports.BaseCustomError = BaseCustomError;
