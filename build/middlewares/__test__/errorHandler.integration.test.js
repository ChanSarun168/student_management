"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const errorHandler_1 = require("../errorHandler");
// Setup an Express app with routes to test the error handler
const app = (0, express_1.default)();
// Example route that throws an error
app.get("/error", (req, res, next) => {
    const error = new Error("Test error");
    next(error);
});
// Global error handler middleware
app.use(errorHandler_1.errorHandler);
describe("Integration tests for errorHandler middleware", () => {
    it("should handle errors and respond with a JSON error message", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/error");
        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            statusCode: 500,
            message: "Test error",
        });
    }));
    it("should handle 404 errors and respond with a JSON error message", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/non-existing-route");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            statusCode: 404,
            message: "Not Found",
        });
    }));
});
