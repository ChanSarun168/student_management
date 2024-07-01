"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../errorHandler");
describe("errorHandler middleware", () => {
    it("should set the response status and send a JSON error message", () => {
        const req = {};
        const res = {
            statusCode: 500,
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        const error = new Error("Test error");
        (0, errorHandler_1.errorHandler)(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            statusCode: 500,
            message: "Test error",
        });
        expect(next).toHaveBeenCalled();
    });
    it("should set the response status to 500 if not provided and send a JSON error message", () => {
        const req = {};
        const res = {
            statusCode: undefined,
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        const error = new Error("Test error");
        (0, errorHandler_1.errorHandler)(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            statusCode: 500,
            message: "Test error",
        });
        expect(next).toHaveBeenCalled();
    });
});
