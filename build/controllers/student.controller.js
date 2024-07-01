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
exports.StudentController = void 0;
const student_service_1 = require("../services/student.service");
class StudentController {
    constructor() {
        this.studentservice = new student_service_1.StudentService();
    }
    getAllStudent(name, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentservice.getAllStudent(name, phone);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Create Student
    CreateStudent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentservice.AddStudent(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Get Student By Id
    GetStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentservice.GetStudentById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Update Student data
    UpdateStudent(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentservice.UpdateStudent(id, data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Delete Student
    DeleteStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentservice.DeleteStudent(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Register Course for student
    Registercourse(courseId, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentservice.RegisterCourse(courseId, studentId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // remove Course for Student
    RemoveCourse(courseId, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentservice.RemoveCourse(courseId, studentId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Get Course Report
    GetStudentReport() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentservice.getStudentReport();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.StudentController = StudentController;
