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
exports.courseRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const course_model_1 = require("../models/course.model");
const customError_1 = require("../../utils/customError");
const consts_1 = require("../../utils/consts");
class courseRepository {
    // get all course
    GetAllCourse(nameFilter, startDateFilter, endDateFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = { isdeleted: false };
                if (nameFilter) {
                    filter.name = { $regex: nameFilter, $options: "i" }; // Case-insensitive regex search
                }
                if (startDateFilter && endDateFilter) {
                    filter.start_date = { $gte: startDateFilter };
                    filter.end_date = { $lte: endDateFilter };
                }
                else if (startDateFilter) {
                    filter.start_date = { $gte: startDateFilter };
                }
                else if (endDateFilter) {
                    filter.end_date = { $lte: endDateFilter };
                }
                return yield course_model_1.CourseModel.find(filter);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Create Course
    CreateCourse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield course_model_1.CourseModel.create(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Update Course
    UpdateCourse(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new customError_1.BaseCustomError("Id is wrong format", consts_1.StatusCode.BadRequest);
                }
                const course = yield course_model_1.CourseModel.findById(id);
                if (!course) {
                    const customError = new customError_1.BaseCustomError("Course not found. Please check the provided ID.", consts_1.StatusCode.NoContent); // Create custom error
                    throw customError;
                }
                const courseupdate = yield course_model_1.CourseModel.findByIdAndUpdate(id, data, {
                    new: true,
                });
                return courseupdate;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Delete Course
    DeleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new customError_1.BaseCustomError("Id is wrong format", consts_1.StatusCode.BadRequest);
                }
                const course = yield course_model_1.CourseModel.findById(id);
                if (!course) {
                    const customError = new customError_1.BaseCustomError("Course not found. Please check the provided ID.", consts_1.StatusCode.NoContent); // Create custom error
                    throw customError;
                }
                return yield course_model_1.CourseModel.findByIdAndUpdate(id, { isdeleted: true }, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Get course Report
    GetCourseReport() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield course_model_1.CourseModel.find({ isdeleted: false });
                if (courses.length === 0) {
                    throw new customError_1.BaseCustomError("No courses in our system", consts_1.StatusCode.NoContent);
                }
                const report = courses.map(course => ({
                    name: course.name,
                    professor_name: course.professor_name,
                    start_date: course.start_date,
                    end_date: course.end_date,
                    limit_student: course.limit_student,
                    registered_students: course.studentEnroll.length,
                }));
                return report;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.courseRepository = courseRepository;
