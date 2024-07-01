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
exports.courseService = void 0;
const course_repository_1 = require("../databases/repositories/course.repository");
class courseService {
    constructor() {
        this.courseRepo = new course_repository_1.courseRepository();
    }
    // get all course
    GetAllCourse(nameFilter, startDateFilter, endDateFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.courseRepo.GetAllCourse(nameFilter, startDateFilter, endDateFilter);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Create new Course
    Createcourse(Data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.courseRepo.CreateCourse(Data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Update Course 
    Updatecourse(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.courseRepo.UpdateCourse(id, data);
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
                return yield this.courseRepo.DeleteCourse(id);
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
                return yield this.courseRepo.GetCourseReport();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.courseService = courseService;
