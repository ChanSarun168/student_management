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
exports.StudentRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("../models/student.model");
const customError_1 = require("../../utils/customError");
const consts_1 = require("../../utils/consts");
const course_model_1 = require("../models/course.model");
class StudentRepository {
    // Get All Student
    FindAllStudent(name, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = { isdeleted: false };
                if (name) {
                    query.$or = [
                        { en_name: new RegExp(name, "i") },
                        { kh_name: new RegExp(name, "i") },
                    ];
                }
                if (phone) {
                    query.phonenumber = new RegExp(phone, "i");
                }
                const students = yield student_model_1.StudentModel.find(query);
                return students;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Add student to Database
    CreateStudent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newStudent = yield student_model_1.StudentModel.create(data);
                return newStudent;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Get Student by Id
    GetStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new customError_1.BaseCustomError("Id is wrong format", consts_1.StatusCode.BadRequest);
                }
                const student = yield student_model_1.StudentModel.findById(id);
                if (!student) {
                    const customError = new customError_1.BaseCustomError("Student not found. Please check the provided ID.", consts_1.StatusCode.NoContent); // Create custom error
                    throw customError;
                }
                return student;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // update Student Info
    UpdateStudent(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check if Id is invalid from mongodb
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new customError_1.BaseCustomError("Id is wrong format", consts_1.StatusCode.BadRequest);
                }
                // check db to find student
                const student = yield student_model_1.StudentModel.findById(id);
                if (!student) {
                    const customError = new customError_1.BaseCustomError("Student not found. Please check the provided ID.", consts_1.StatusCode.NoContent); // Create custom error
                    throw customError;
                }
                const updatestudent = yield student_model_1.StudentModel.findByIdAndUpdate(id, data, {
                    new: true,
                });
                return updatestudent;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Delete student (soft delete)
    DeleteStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check if Id is invalid from mongodb
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new customError_1.BaseCustomError("Id is wrong format", consts_1.StatusCode.BadRequest);
                }
                // check db to find student
                const student = yield student_model_1.StudentModel.findById(id);
                if (!student) {
                    const customError = new customError_1.BaseCustomError("Student not found. Please check the provided ID.", consts_1.StatusCode.NoContent); // Create custom error
                    throw customError;
                }
                return yield student_model_1.StudentModel.findByIdAndUpdate(id, { isdeleted: true }, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Register Course
    RegisterCourse(courseId, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(courseId)) {
                    throw new customError_1.BaseCustomError("CourseId is wrong format", consts_1.StatusCode.BadRequest);
                }
                if (!mongoose_1.default.Types.ObjectId.isValid(studentId)) {
                    throw new customError_1.BaseCustomError("StudentId is wrong format", consts_1.StatusCode.BadRequest);
                }
                // Find the course and student
                const course = yield course_model_1.CourseModel.findById(courseId);
                const student = yield student_model_1.StudentModel.findById(studentId);
                if (!course || !student) {
                    throw new customError_1.BaseCustomError("Course or Student not found", consts_1.StatusCode.NotFound);
                }
                // Check if course is deleted
                if (course.isdeleted) {
                    throw new customError_1.BaseCustomError("Course is deleted and cannot be registered", consts_1.StatusCode.BadRequest);
                }
                // Check if course is already full
                if (course.isfull) {
                    throw new customError_1.BaseCustomError("Course is already full", consts_1.StatusCode.BadRequest);
                }
                // Check if student is already enrolled
                if (student.courseEnrolled.includes(courseId)) {
                    throw new customError_1.BaseCustomError("Student is already enrolled in this course", consts_1.StatusCode.BadRequest);
                }
                // Register the student for the course
                course.studentEnroll.push(studentId);
                student.courseEnrolled.push(courseId);
                // Check if course is now full after registration
                if (course.studentEnroll.length >= course.limit_student) {
                    course.isfull = true;
                }
                // Save both course and student
                const registerCourse = yield course.save();
                const registerStudent = yield student.save();
                const data = {
                    course: registerCourse.name,
                    student: registerStudent.en_name,
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Remove Course
    RemoveCourse(courseId, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(courseId)) {
                    throw new customError_1.BaseCustomError("CourseId is wrong format", consts_1.StatusCode.BadRequest);
                }
                if (!mongoose_1.default.Types.ObjectId.isValid(studentId)) {
                    throw new customError_1.BaseCustomError("StudentId is wrong format", consts_1.StatusCode.BadRequest);
                }
                // Find the course and student
                const course = yield course_model_1.CourseModel.findById(courseId);
                const student = yield student_model_1.StudentModel.findById(studentId);
                if (!course || !student) {
                    throw new customError_1.BaseCustomError("Course or Student not found", consts_1.StatusCode.NotFound);
                }
                // Check if student is enrolled in the course
                if (!course.studentEnroll.includes(studentId)) {
                    throw new customError_1.BaseCustomError("Student is not enrolled in this course", consts_1.StatusCode.BadRequest);
                }
                // Remove the student from the course
                course.studentEnroll = course.studentEnroll.filter((id) => id !== studentId);
                // Remove the course from the student's enrolled courses
                student.courseEnrolled = student.courseEnrolled.filter((id) => id !== courseId);
                // Check if course is now not full after removal
                if (course.isfull && course.studentEnroll.length < course.limit_student) {
                    course.isfull = false;
                }
                // Save both course and student
                yield course.save();
                yield student.save();
                return {
                    course: course.name,
                    student: student.en_name,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Get data for Student Report
    GetStudentReport() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield student_model_1.StudentModel.find({ isdeleted: false })
                    .populate('courseEnrolled', 'name');
                if (students.length === 0) {
                    throw new customError_1.BaseCustomError("No students in our system", consts_1.StatusCode.NoContent);
                }
                const studentCount = students.length; // Count of students
                const report = students.map(student => ({
                    full_name: `${student.en_name} (${student.kh_name})`,
                    date_of_birth: student.dob,
                    gender: student.gender,
                    phone_number: student.phonenumber,
                    registered_courses: student.courseEnrolled.length,
                    courses: student.courseEnrolled.map((course) => course.name)
                }));
                return { report, studentCount };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.StudentRepository = StudentRepository;
