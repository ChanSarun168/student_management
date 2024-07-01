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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const course_service_1 = require("../services/course.service");
class CourseController {
    constructor() {
        this.courseservice = new course_service_1.courseService();
    }
    // Get ALL Course
    GetAllCourse(nameFilter, startDateFilter, endDateFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.courseservice.GetAllCourse(nameFilter, startDateFilter, endDateFilter);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Create new Course
    CreateCourse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.courseservice.Createcourse(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Update Course data
    UpdateCourse(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.courseservice.Updatecourse(id, data);
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
                return yield this.courseservice.DeleteCourse(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Get Course Report
    GetCourseReport() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.courseservice.GetCourseReport();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CourseController = CourseController;
