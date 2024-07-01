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
exports.StudentService = void 0;
const student_repository_1 = require("../databases/repositories/student.repository");
class StudentService {
    constructor() {
        this.studentRepo = new student_repository_1.StudentRepository();
    }
    // Get all Student
    getAllStudent(name, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentRepo.FindAllStudent(name, phone);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // add student to database
    AddStudent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentRepo.CreateStudent(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Get student By Id
    GetStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentRepo.GetStudentById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Update student Info
    UpdateStudent(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentRepo.UpdateStudent(id, data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Delete student
    DeleteStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentRepo.DeleteStudent(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Register course for student
    RegisterCourse(courseId, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentRepo.RegisterCourse(courseId, studentId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Remove course for student
    RemoveCourse(courseId, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentRepo.RemoveCourse(courseId, studentId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Get Report of Student
    getStudentReport() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentRepo.GetStudentReport();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.StudentService = StudentService;
