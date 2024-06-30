import mongoose from "mongoose";
import { StudentModel } from "../models/student.model";
import { IStudent } from "../types/student.type";
import { BaseCustomError } from "../../utils/customError";
import { StatusCode } from "../../utils/consts";
import { CourseModel } from "../models/course.model";

export class StudentRepository {
  // Get All Student
  async FindAllStudent(name?: string, phone?: string) {
    try {
      let query: any = { isdeleted: false };

      if (name) {
        query.$or = [
          { en_name: new RegExp(name, "i") },
          { kh_name: new RegExp(name, "i") },
        ];
      }

      if (phone) {
        query.phonenumber = new RegExp(phone, "i");
      }

      const students = await StudentModel.find(query);
      return students;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Add student to Database
  async CreateStudent(data: IStudent) {
    try {
      const newStudent = await StudentModel.create(data);
      return newStudent;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Get Student by Id
  async GetStudentById(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BaseCustomError("Id is wrong format", StatusCode.BadRequest);
      }
      const student = await StudentModel.findById(id);
      if (!student) {
        const customError = new BaseCustomError(
          "Student not found. Please check the provided ID.",
          StatusCode.NoContent
        ); // Create custom error
        throw customError;
      }
      return student;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // update Student Info
  async UpdateStudent(id: string, data: object) {
    try {
      // check if Id is invalid from mongodb
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BaseCustomError("Id is wrong format", StatusCode.BadRequest);
      }

      // check db to find student
      const student = await StudentModel.findById(id);
      if (!student) {
        const customError = new BaseCustomError(
          "Student not found. Please check the provided ID.",
          StatusCode.NoContent
        ); // Create custom error
        throw customError;
      }

      const updatestudent = await StudentModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updatestudent;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Delete student (soft delete)
  async DeleteStudent(id: string) {
    try {
      // check if Id is invalid from mongodb
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BaseCustomError("Id is wrong format", StatusCode.BadRequest);
      }

      // check db to find student
      const student = await StudentModel.findById(id);
      if (!student) {
        const customError = new BaseCustomError(
          "Student not found. Please check the provided ID.",
          StatusCode.NoContent
        ); // Create custom error
        throw customError;
      }

      return await StudentModel.findByIdAndUpdate(
        id,
        { isdeleted: true },
        { new: true }
      );
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Register Course
  async RegisterCourse(courseId: string, studentId: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        throw new BaseCustomError(
          "CourseId is wrong format",
          StatusCode.BadRequest
        );
      }
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        throw new BaseCustomError(
          "StudentId is wrong format",
          StatusCode.BadRequest
        );
      }
      // Find the course and student
      const course = await CourseModel.findById(courseId);
      const student = await StudentModel.findById(studentId);

      if (!course || !student) {
        throw new BaseCustomError(
          "Course or Student not found",
          StatusCode.NotFound
        );
      }

      // Check if course is deleted
      if (course.isdeleted) {
        throw new BaseCustomError(
          "Course is deleted and cannot be registered",
          StatusCode.BadRequest
        );
      }

      // Check if course is already full
      if (course.isfull) {
        throw new BaseCustomError(
          "Course is already full",
          StatusCode.BadRequest
        );
      }

      // Check if student is already enrolled
      if (student.courseEnrolled.includes(courseId)) {
        throw new BaseCustomError(
          "Student is already enrolled in this course",
          StatusCode.BadRequest
        );
      }
      // Register the student for the course
      course.studentEnroll.push(studentId);
      student.courseEnrolled.push(courseId);

      // Check if course is now full after registration
      if (course.studentEnroll.length >= course.limit_student) {
        course.isfull = true;
      }
      // Save both course and student
      const registerCourse = await course.save();
      const registerStudent = await student.save();
      const data = {
        course: registerCourse.name,
        student: registerStudent.en_name,
      };
      return data;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Remove Course
  async RemoveCourse(courseId: string, studentId: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        throw new BaseCustomError(
          "CourseId is wrong format",
          StatusCode.BadRequest
        );
      }
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        throw new BaseCustomError(
          "StudentId is wrong format",
          StatusCode.BadRequest
        );
      }

      // Find the course and student
      const course = await CourseModel.findById(courseId);
      const student = await StudentModel.findById(studentId);

      if (!course || !student) {
        throw new BaseCustomError(
          "Course or Student not found",
          StatusCode.NotFound
        );
      }

      // Check if student is enrolled in the course
      if (!course.studentEnroll.includes(studentId)) {
        throw new BaseCustomError(
          "Student is not enrolled in this course",
          StatusCode.BadRequest
        );
      }

      // Remove the student from the course
      course.studentEnroll = course.studentEnroll.filter(
        (id) => id !== studentId
      );

      // Remove the course from the student's enrolled courses
      student.courseEnrolled = student.courseEnrolled.filter(
        (id) => id !== courseId
      );

      // Check if course is now not full after removal
      if (course.isfull && course.studentEnroll.length < course.limit_student) {
        course.isfull = false;
      }

      // Save both course and student
      await course.save();
      await student.save();

      return {
        course: course.name,
        student: student.en_name,
      };
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Get data for Student Report
  async GetStudentReport() {
    try {
      const students = await StudentModel.find({ isdeleted: false })
        .populate('courseEnrolled', 'name');

      if (students.length === 0) {
        throw new BaseCustomError("No students in our system", StatusCode.NoContent);
      }

      const studentCount = students.length; // Count of students

      const report = students.map(student => ({
        full_name: `${student.en_name} (${student.kh_name})`,
        date_of_birth: student.dob,
        gender: student.gender,
        phone_number: student.phonenumber,
        registered_courses: student.courseEnrolled.length,
        courses: student.courseEnrolled.map((course: any) => course.name)
      }));

      return {report ,studentCount};
    } catch (error: unknown | any) {
      throw error;
    }
  }
}
