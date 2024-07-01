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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const course_model_1 = require("../../databases/models/course.model"); // Adjust the path
jest.mock('../../databases/models/course.model'); // Mock the CourseModel
const mockCourseData = {
    name: "Test Course",
    professor_name: "Test Professor",
    limit_student: 30,
    start_date: new Date(),
    end_date: new Date()
};
describe('Course Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should get all courses', () => __awaiter(void 0, void 0, void 0, function* () {
        course_model_1.CourseModel.find = jest.fn().mockResolvedValue([mockCourseData]);
        const response = yield (0, supertest_1.default)(app_1.app).get('/v1/course');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: "success",
            message: "Courses have been found!!",
            data: [mockCourseData]
        });
    }));
    it('should create a new course', () => __awaiter(void 0, void 0, void 0, function* () {
        course_model_1.CourseModel.create = jest.fn().mockResolvedValue(mockCourseData);
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/courses')
            .send(mockCourseData);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: "Success",
            message: "Course has been create successfully",
            data: mockCourseData
        });
    }));
    it('should update a course', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedCourse = Object.assign(Object.assign({}, mockCourseData), { name: "Updated Course" });
        course_model_1.CourseModel.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedCourse);
        const response = yield (0, supertest_1.default)(app_1.app)
            .put(`/v1/course/1`)
            .send(updatedCourse);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: "Succcess",
            message: "Course has been update successfully",
            data: updatedCourse
        });
    }));
    it('should delete a course', () => __awaiter(void 0, void 0, void 0, function* () {
        course_model_1.CourseModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockCourseData);
        const response = yield (0, supertest_1.default)(app_1.app)
            .delete(`v1/course/1`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: "success",
            message: "Course has been delete successfully"
        });
    }));
    it('should get course report', () => __awaiter(void 0, void 0, void 0, function* () {
        const report = [mockCourseData];
        course_model_1.CourseModel.find = jest.fn().mockResolvedValue(report);
        const response = yield (0, supertest_1.default)(app_1.app)
            .get('/v1/course/report');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: "success",
            message: "Here the Course Report",
            report
        });
    }));
});
