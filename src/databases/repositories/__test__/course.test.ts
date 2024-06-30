import mongoose from "mongoose";
import { courseRepository } from "../course.repository";
import { CourseModel } from "../../models/course.model";
import { ICourse } from "../../types/course.type";
import { BaseCustomError } from "../../../utils/customError";
import { StatusCode } from "../../../utils/consts";

jest.mock("../../models/course.model");

const mockCourseData: ICourse = {
  name: "Test Course",
  professor_name: "Test Professor",
  start_date: new Date(),
  end_date: new Date(),
  limit_student: 30,
  studentEnroll: [],
  isdeleted: false,
};

describe("courseRepository", () => {
  let courseRepo: courseRepository;

  beforeEach(() => {
    courseRepo = new courseRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GetAllCourse", () => {
    it("should return all courses without filters", async () => {
      (CourseModel.find as jest.Mock).mockResolvedValue([mockCourseData]);

      const result = await courseRepo.GetAllCourse();

      expect(CourseModel.find).toHaveBeenCalledWith({ isdeleted: false });
      expect(result).toEqual([mockCourseData]);
    });

    it("should return filtered courses by name", async () => {
      (CourseModel.find as jest.Mock).mockResolvedValue([mockCourseData]);

      const result = await courseRepo.GetAllCourse("Test");

      expect(CourseModel.find).toHaveBeenCalledWith({
        isdeleted: false,
        name: { $regex: "Test", $options: "i" },
      });
      expect(result).toEqual([mockCourseData]);
    });

    // Add tests for date filters here...
  });

  describe("CreateCourse", () => {
    it("should create a course", async () => {
      (CourseModel.create as jest.Mock).mockResolvedValue(mockCourseData);

      const result = await courseRepo.CreateCourse(mockCourseData);

      expect(CourseModel.create).toHaveBeenCalledWith(mockCourseData);
      expect(result).toEqual(mockCourseData);
    });
  });

  describe("UpdateCourse", () => {
    it("should throw an error for invalid id", async () => {
      const invalidId = "invalidId";

      await expect(courseRepo.UpdateCourse(invalidId, {})).rejects.toThrow(
        new BaseCustomError("Id is wrong format", StatusCode.BadRequest)
      );
    });

    it("should update a course", async () => {
      const validId = new mongoose.Types.ObjectId().toString();
      const updateData = { name: "Updated Course" };

      (CourseModel.findById as jest.Mock).mockResolvedValue(mockCourseData);
      (CourseModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        ...mockCourseData,
        ...updateData,
      });

      const result = await courseRepo.UpdateCourse(validId, updateData);

      expect(CourseModel.findById).toHaveBeenCalledWith(validId);
      expect(CourseModel.findByIdAndUpdate).toHaveBeenCalledWith(
        validId,
        updateData,
        { new: true }
      );
      expect(result).toEqual({ ...mockCourseData, ...updateData });
    });
  });

  describe("DeleteCourse", () => {
    it("should throw an error for invalid id", async () => {
      const invalidId = "invalidId";

      await expect(courseRepo.DeleteCourse(invalidId)).rejects.toThrow(
        new BaseCustomError("Id is wrong format", StatusCode.BadRequest)
      );
    });

    it("should delete a course", async () => {
      const validId = new mongoose.Types.ObjectId().toString();

      (CourseModel.findById as jest.Mock).mockResolvedValue(mockCourseData);
      (CourseModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        ...mockCourseData,
        isdeleted: true,
      });

      const result = await courseRepo.DeleteCourse(validId);

      expect(CourseModel.findById).toHaveBeenCalledWith(validId);
      expect(CourseModel.findByIdAndUpdate).toHaveBeenCalledWith(
        validId,
        { isdeleted: true },
        { new: true }
      );
      expect(result).toEqual({ ...mockCourseData, isdeleted: true });
    });
  });

  describe("GetCourseReport", () => {
    it("should return course report", async () => {
      (CourseModel.find as jest.Mock).mockResolvedValue([mockCourseData]);

      const result = await courseRepo.GetCourseReport();

      expect(CourseModel.find).toHaveBeenCalledWith({ isdeleted: false });
      expect(result).toEqual([
        {
          name: mockCourseData.name,
          professor_name: mockCourseData.professor_name,
          start_date: mockCourseData.start_date,
          end_date: mockCourseData.end_date,
          limit_student: mockCourseData.limit_student,
          registered_students: mockCourseData.studentEnroll?.length,
        },
      ]);
    });

    it("should throw an error if no courses found", async () => {
      (CourseModel.find as jest.Mock).mockResolvedValue([]);

      await expect(courseRepo.GetCourseReport()).rejects.toThrow(
        new BaseCustomError("No courses in our system", StatusCode.NoContent)
      );
    });
  });
});
