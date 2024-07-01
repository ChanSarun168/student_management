"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const student_routes_1 = require("./routes/student.routes");
const errorHandler_1 = require("./middlewares/errorHandler");
const course_routes_1 = require("./routes/course.routes");
const customError_1 = require("./utils/customError");
exports.app = (0, express_1.default)();
// Get the Configs!
// const config = getConfig(process.env.NODE_ENV);
exports.app.use(express_1.default.json());
// Use body-parser to parse URL-encoded bodies
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use("/v1/student", student_routes_1.studentRoute);
exports.app.use("/v1/course", course_routes_1.courseRoute);
// Catch 404 and forward to error handler
exports.app.use((req, res, next) => {
    res.status(404);
    const error = new customError_1.BaseCustomError("Not Found", 404);
    next(error);
});
// global error
exports.app.use(errorHandler_1.errorHandler);
