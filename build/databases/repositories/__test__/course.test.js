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
const course_repository_1 = require("../course.repository");
const course_model_1 = require("../../models/course.model");
const customError_1 = require("../../../utils/customError");
const consts_1 = require("../../../utils/consts");
jest.mock("../../models/course.model");
const mockCourseData = {
    name: "Test Course",
    professor_name: "Test Professor",
    start_date: new Date(),
    end_date: new Date(),
    limit_student: 30,
    studentEnroll: [],
    isdeleted: false,
};
describe("courseRepository", () => {
    let courseRepo;
    beforeEach(() => {
        courseRepo = new course_repository_1.courseRepository();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("GetAllCourse", () => {
        it("should return all courses without filters", () => __awaiter(void 0, void 0, void 0, function* () {
            course_model_1.CourseModel.find.mockResolvedValue([mockCourseData]);
            const result = yield courseRepo.GetAllCourse();
            expect(course_model_1.CourseModel.find).toHaveBeenCalledWith({ isdeleted: false });
            expect(result).toEqual([mockCourseData]);
        }));
        it("should return filtered courses by name", () => __awaiter(void 0, void 0, void 0, function* () {
            course_model_1.CourseModel.find.mockResolvedValue([mockCourseData]);
            const result = yield courseRepo.GetAllCourse("Test");
            expect(course_model_1.CourseModel.find).toHaveBeenCalledWith({
                isdeleted: false,
                name: { $regex: "Test", $options: "i" },
            });
            expect(result).toEqual([mockCourseData]);
        }));
        // Add tests for date filters here...
    });
    describe("CreateCourse", () => {
        it("should create a course", () => __awaiter(void 0, void 0, void 0, function* () {
            course_model_1.CourseModel.create.mockResolvedValue(mockCourseData);
            const result = yield courseRepo.CreateCourse(mockCourseData);
            expect(course_model_1.CourseModel.create).toHaveBeenCalledWith(mockCourseData);
            expect(result).toEqual(mockCourseData);
        }));
    });
    describe("UpdateCourse", () => {
        it("should throw an error for invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidId = "invalidId";
            yield expect(courseRepo.UpdateCourse(invalidId, {})).rejects.toThrow(new customError_1.BaseCustomError("Id is wrong format", consts_1.StatusCode.BadRequest));
        }));
        it("should update a course", () => __awaiter(void 0, void 0, void 0, function* () {
            const validId = new mongoose_1.default.Types.ObjectId().toString();
            const updateData = { name: "Updated Course" };
            course_model_1.CourseModel.findById.mockResolvedValue(mockCourseData);
            course_model_1.CourseModel.findByIdAndUpdate.mockResolvedValue(Object.assign(Object.assign({}, mockCourseData), updateData));
            const result = yield courseRepo.UpdateCourse(validId, updateData);
            expect(course_model_1.CourseModel.findById).toHaveBeenCalledWith(validId);
            expect(course_model_1.CourseModel.findByIdAndUpdate).toHaveBeenCalledWith(validId, updateData, { new: true });
            expect(result).toEqual(Object.assign(Object.assign({}, mockCourseData), updateData));
        }));
    });
    describe("DeleteCourse", () => {
        it("should throw an error for invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidId = "invalidId";
            yield expect(courseRepo.DeleteCourse(invalidId)).rejects.toThrow(new customError_1.BaseCustomError("Id is wrong format", consts_1.StatusCode.BadRequest));
        }));
        it("should delete a course", () => __awaiter(void 0, void 0, void 0, function* () {
            const validId = new mongoose_1.default.Types.ObjectId().toString();
            course_model_1.CourseModel.findById.mockResolvedValue(mockCourseData);
            course_model_1.CourseModel.findByIdAndUpdate.mockResolvedValue(Object.assign(Object.assign({}, mockCourseData), { isdeleted: true }));
            const result = yield courseRepo.DeleteCourse(validId);
            expect(course_model_1.CourseModel.findById).toHaveBeenCalledWith(validId);
            expect(course_model_1.CourseModel.findByIdAndUpdate).toHaveBeenCalledWith(validId, { isdeleted: true }, { new: true });
            expect(result).toEqual(Object.assign(Object.assign({}, mockCourseData), { isdeleted: true }));
        }));
    });
    describe("GetCourseReport", () => {
        it("should return course report", () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            course_model_1.CourseModel.find.mockResolvedValue([mockCourseData]);
            const result = yield courseRepo.GetCourseReport();
            expect(course_model_1.CourseModel.find).toHaveBeenCalledWith({ isdeleted: false });
            expect(result).toEqual([
                {
                    name: mockCourseData.name,
                    professor_name: mockCourseData.professor_name,
                    start_date: mockCourseData.start_date,
                    end_date: mockCourseData.end_date,
                    limit_student: mockCourseData.limit_student,
                    registered_students: (_a = mockCourseData.studentEnroll) === null || _a === void 0 ? void 0 : _a.length,
                },
            ]);
        }));
        it("should throw an error if no courses found", () => __awaiter(void 0, void 0, void 0, function* () {
            course_model_1.CourseModel.find.mockResolvedValue([]);
            yield expect(courseRepo.GetCourseReport()).rejects.toThrow(new customError_1.BaseCustomError("No courses in our system", consts_1.StatusCode.NoContent));
        }));
    });
});
