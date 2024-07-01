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
exports.courseRoute = void 0;
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const customError_1 = require("../utils/customError");
const consts_1 = require("../utils/consts");
const validateInput_1 = require("../middlewares/validateInput");
const course_schema_1 = __importDefault(require("../schemas/course.schema"));
const parseDate_1 = __importDefault(require("../middlewares/parseDate"));
exports.courseRoute = (0, express_1.Router)();
const coursecontroller = new course_controller_1.CourseController();
// Get All Course
exports.courseRoute.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, start_date, end_date } = req.query;
        // Convert query parameters to appropriate types
        const nameFilter = name ? String(name) : undefined;
        const startDateFilter = start_date ? new Date(String(start_date)) : undefined;
        const endDateFilter = end_date ? new Date(String(end_date)) : undefined;
        const courses = yield coursecontroller.GetAllCourse(nameFilter, startDateFilter, endDateFilter);
        if (courses.length > 0) {
            res.json({
                status: "success",
                message: "Courses have been found!!",
                data: courses
            });
        }
        else {
            throw new customError_1.BaseCustomError("No Course in Database", consts_1.StatusCode.NoContent);
        }
    }
    catch (error) {
        next(error);
    }
}));
// Create new Course
exports.courseRoute.post("/", parseDate_1.default, (0, validateInput_1.validateInputData)(course_schema_1.default), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, professor_name, limit_student, start_date, end_date } = req.body;
        const data = {
            name,
            professor_name,
            limit_student,
            start_date,
            end_date
        };
        const course = yield coursecontroller.CreateCourse(data);
        res.json({
            status: "Success",
            message: "Course has been create successfully",
            data: course
        });
    }
    catch (error) {
        next(error);
    }
}));
// Update data
exports.courseRoute.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield coursecontroller.UpdateCourse(req.params.id, req.body);
        res.json({
            status: "Succcess",
            message: "Course has been update successfully",
            data: course
        });
    }
    catch (error) {
        next(error);
    }
}));
// Delete Course
exports.courseRoute.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield coursecontroller.DeleteCourse(req.params.id);
        res.json({
            status: "success",
            message: "Course has been delete successfully"
        });
    }
    catch (error) {
        next(error);
    }
}));
// Get Course Report
exports.courseRoute.get("/report", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield coursecontroller.GetCourseReport();
        res.json({
            status: "success",
            message: "Here the Course Report",
            report: report
        });
    }
    catch (error) {
        next(error);
    }
}));
