import mongoose from "mongoose";
import { CourseModel } from "../models/course.model";
import { ICourse } from "../types/course.type";
import { BaseCustomError } from "../../utils/customError";
import { StatusCode } from "../../utils/consts";

export class courseRepository {
  // get all course
  async GetAllCourse(
    nameFilter?: string,
    startDateFilter?: Date,
    endDateFilter?: Date
  ) {
    try {
      const filter: any = { isdeleted: false };

      if (nameFilter) {
        filter.name = { $regex: nameFilter, $options: "i" }; // Case-insensitive regex search
      }
      if (startDateFilter && endDateFilter) {
        filter.start_date = { $gte: startDateFilter };
        filter.end_date = { $lte: endDateFilter };
      } else if (startDateFilter) {
        filter.start_date = { $gte: startDateFilter };
      } else if (endDateFilter) {
        filter.end_date = { $lte: endDateFilter };
      }

      return await CourseModel.find(filter);
    } catch (error) {
      throw error;
    }
  }

  // Create Course
  async CreateCourse(data: ICourse) {
    try {
      return await CourseModel.create(data);
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Update Course
  async UpdateCourse(id: string, data: any) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BaseCustomError("Id is wrong format", StatusCode.BadRequest);
      }
      const course = await CourseModel.findById(id);
      if (!course) {
        const customError = new BaseCustomError(
          "Course not found. Please check the provided ID.",
          StatusCode.NoContent
        ); // Create custom error
        throw customError;
      }
      const courseupdate = await CourseModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return courseupdate;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Delete Course
  async DeleteCourse(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BaseCustomError("Id is wrong format", StatusCode.BadRequest);
      }
      const course = await CourseModel.findById(id);
      if (!course) {
        const customError = new BaseCustomError(
          "Course not found. Please check the provided ID.",
          StatusCode.NoContent
        ); // Create custom error
        throw customError;
      }
      return await CourseModel.findByIdAndUpdate(
        id,
        { isdeleted: true },
        { new: true }
      );
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Get course Report
    async GetCourseReport() {
      try {
        const courses = await CourseModel.find({ isdeleted: false });
  
        if (courses.length === 0) {
          throw new BaseCustomError("No courses in our system", StatusCode.NoContent);
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
      } catch (error: unknown | any) {
        throw error;
      }
    }
}
