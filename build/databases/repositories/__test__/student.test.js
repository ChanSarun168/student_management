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
const mongoose_1 = __importDefault(require("mongoose"));
const student_repository_1 = require("../student.repository");
const student_model_1 = require("../../models/student.model");
const course_model_1 = require("../../models/course.model");
const customError_1 = require("../../../utils/customError");
const consts_1 = require("../../../utils/consts");
jest.mock('../../models/student.model');
jest.mock('../../models/course.model');
const mockStudentData = {
    en_name: 'John Doe',
    kh_name: 'John Khmer',
    dob: new Date(),
    gender: 'male',
    phonenumber: '123456789',
    courseEnrolled: [],
    isdeleted: false,
};
describe('StudentRepository', () => {
    let studentRepo;
    beforeEach(() => {
        studentRepo = new student_repository_1.StudentRepository();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('FindAllStudent', () => {
        it('should return all students without filters', () => __awaiter(void 0, void 0, void 0, function* () {
            student_model_1.StudentModel.find.mockResolvedValue([mockStudentData]);
            const result = yield studentRepo.FindAllStudent();
            expect(student_model_1.StudentModel.find).toHaveBeenCalledWith({ isdeleted: false });
            expect(result).toEqual([mockStudentData]);
        }));
        it('should return filtered students by name', () => __awaiter(void 0, void 0, void 0, function* () {
            student_model_1.StudentModel.find.mockResolvedValue([mockStudentData]);
            const result = yield studentRepo.FindAllStudent('John');
            expect(student_model_1.StudentModel.find).toHaveBeenCalledWith({
                isdeleted: false,
                $or: [
                    { en_name: new RegExp('John', 'i') },
                    { kh_name: new RegExp('John', 'i') },
                ],
            });
            expect(result).toEqual([mockStudentData]);
        }));
        it('should return filtered students by phone', () => __awaiter(void 0, void 0, void 0, function* () {
            student_model_1.StudentModel.find.mockResolvedValue([mockStudentData]);
            const result = yield studentRepo.FindAllStudent(undefined, '123456789');
            expect(student_model_1.StudentModel.find).toHaveBeenCalledWith({
                isdeleted: false,
                phonenumber: new RegExp('123456789', 'i'),
            });
            expect(result).toEqual([mockStudentData]);
        }));
    });
    describe('CreateStudent', () => {
        it('should create a student', () => __awaiter(void 0, void 0, void 0, function* () {
            student_model_1.StudentModel.create.mockResolvedValue(mockStudentData);
            const result = yield studentRepo.CreateStudent(mockStudentData);
            expect(student_model_1.StudentModel.create).toHaveBeenCalledWith(mockStudentData);
            expect(result).toEqual(mockStudentData);
        }));
    });
    describe('GetStudentById', () => {
        it('should throw an error for invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidId = 'invalidId';
            yield expect(studentRepo.GetStudentById(invalidId)).rejects.toThrow(new customError_1.BaseCustomError('Id is wrong format', consts_1.StatusCode.BadRequest));
        }));
        it('should return a student by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const validId = new mongoose_1.default.Types.ObjectId().toString();
            student_model_1.StudentModel.findById.mockResolvedValue(mockStudentData);
            const result = yield studentRepo.GetStudentById(validId);
            expect(student_model_1.StudentModel.findById).toHaveBeenCalledWith(validId);
            expect(result).toEqual(mockStudentData);
        }));
    });
    describe('UpdateStudent', () => {
        it('should throw an error for invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidId = 'invalidId';
            yield expect(studentRepo.UpdateStudent(invalidId, {})).rejects.toThrow(new customError_1.BaseCustomError('Id is wrong format', consts_1.StatusCode.BadRequest));
        }));
        it('should update a student', () => __awaiter(void 0, void 0, void 0, function* () {
            const validId = new mongoose_1.default.Types.ObjectId().toString();
            const updateData = { en_name: 'Updated Name' };
            student_model_1.StudentModel.findById.mockResolvedValue(mockStudentData);
            student_model_1.StudentModel.findByIdAndUpdate.mockResolvedValue(Object.assign(Object.assign({}, mockStudentData), updateData));
            const result = yield studentRepo.UpdateStudent(validId, updateData);
            expect(student_model_1.StudentModel.findById).toHaveBeenCalledWith(validId);
            expect(student_model_1.StudentModel.findByIdAndUpdate).toHaveBeenCalledWith(validId, updateData, { new: true });
            expect(result).toEqual(Object.assign(Object.assign({}, mockStudentData), updateData));
        }));
    });
    describe('DeleteStudent', () => {
        it('should throw an error for invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidId = 'invalidId';
            yield expect(studentRepo.DeleteStudent(invalidId)).rejects.toThrow(new customError_1.BaseCustomError('Id is wrong format', consts_1.StatusCode.BadRequest));
        }));
        it('should delete a student', () => __awaiter(void 0, void 0, void 0, function* () {
            const validId = new mongoose_1.default.Types.ObjectId().toString();
            student_model_1.StudentModel.findById.mockResolvedValue(mockStudentData);
            student_model_1.StudentModel.findByIdAndUpdate.mockResolvedValue(Object.assign(Object.assign({}, mockStudentData), { isdeleted: true }));
            const result = yield studentRepo.DeleteStudent(validId);
            expect(student_model_1.StudentModel.findById).toHaveBeenCalledWith(validId);
            expect(student_model_1.StudentModel.findByIdAndUpdate).toHaveBeenCalledWith(validId, { isdeleted: true }, { new: true });
            expect(result).toEqual(Object.assign(Object.assign({}, mockStudentData), { isdeleted: true }));
        }));
    });
    describe('RegisterCourse', () => {
        it('should register a course for a student', () => __awaiter(void 0, void 0, void 0, function* () {
            const courseId = new mongoose_1.default.Types.ObjectId().toString();
            const studentId = new mongoose_1.default.Types.ObjectId().toString();
            const mockCourse = {
                _id: courseId,
                name: 'Test Course',
                studentEnroll: [],
                limit_student: 30,
                isfull: false,
                isdeleted: false,
                save: jest.fn().mockResolvedValue({}),
            };
            const mockStudent = {
                _id: studentId,
                en_name: 'John Doe',
                courseEnrolled: [],
                save: jest.fn().mockResolvedValue({}),
            };
            course_model_1.CourseModel.findById.mockResolvedValue(mockCourse);
            student_model_1.StudentModel.findById.mockResolvedValue(mockStudent);
            const result = yield studentRepo.RegisterCourse(courseId, studentId);
            expect(course_model_1.CourseModel.findById).toHaveBeenCalledWith(courseId);
            expect(student_model_1.StudentModel.findById).toHaveBeenCalledWith(studentId);
            expect(mockCourse.save).toHaveBeenCalled();
            expect(mockStudent.save).toHaveBeenCalled();
            expect(result).toEqual({
                course: 'Test Course',
                student: 'John Doe',
            });
        }));
    });
    describe('RemoveCourse', () => {
        it('should remove a course from a student', () => __awaiter(void 0, void 0, void 0, function* () {
            const courseId = new mongoose_1.default.Types.ObjectId().toString();
            const studentId = new mongoose_1.default.Types.ObjectId().toString();
            const mockCourse = {
                _id: courseId,
                name: 'Test Course',
                studentEnroll: [studentId],
                limit_student: 30,
                isfull: false,
                isdeleted: false,
                save: jest.fn().mockResolvedValue({}),
            };
            const mockStudent = {
                _id: studentId,
                en_name: 'John Doe',
                courseEnrolled: [courseId],
                save: jest.fn().mockResolvedValue({}),
            };
            course_model_1.CourseModel.findById.mockResolvedValue(mockCourse);
            student_model_1.StudentModel.findById.mockResolvedValue(mockStudent);
            const result = yield studentRepo.RemoveCourse(courseId, studentId);
            expect(course_model_1.CourseModel.findById).toHaveBeenCalledWith(courseId);
            expect(student_model_1.StudentModel.findById).toHaveBeenCalledWith(studentId);
            expect(mockCourse.save).toHaveBeenCalled();
            expect(mockStudent.save).toHaveBeenCalled();
            expect(result).toEqual({
                course: 'Test Course',
                student: 'John Doe',
            });
        }));
    });
    describe('GetStudentReport', () => {
        it('should return student report', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockStudents = [
                Object.assign(Object.assign({}, mockStudentData), { courseEnrolled: [{ name: 'Test Course' }] }),
            ];
            student_model_1.StudentModel.find.mockResolvedValue(mockStudents);
            const result = yield studentRepo.GetStudentReport();
            expect(student_model_1.StudentModel.find).toHaveBeenCalledWith({ isdeleted: false });
            expect(result).toEqual({
                report: [
                    {
                        full_name: 'John Doe (John Khmer)',
                        date_of_birth: mockStudentData.dob,
                        gender: mockStudentData.gender,
                        phone_number: mockStudentData.phonenumber,
                        registered_courses: 1,
                        courses: ['Test Course'],
                    },
                ],
                studentCount: 1,
            });
        }));
    });
});
