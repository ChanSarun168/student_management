import mongoose from 'mongoose';
import { StudentRepository } from '../student.repository';
import { StudentModel } from '../../models/student.model';
import { CourseModel } from '../../models/course.model';
import { IStudent } from '../../types/student.type';
import { BaseCustomError } from '../../../utils/customError';
import { StatusCode } from '../../../utils/consts';

jest.mock('../../models/student.model');
jest.mock('../../models/course.model');

const mockStudentData: IStudent = {
  en_name: 'John Doe',
  kh_name: 'John Khmer',
  dob: new Date(),
  gender: 'male',
  phonenumber: '123456789',
  courseEnrolled: [],
  isdeleted: false,
};

describe('StudentRepository', () => {
  let studentRepo: StudentRepository;

  beforeEach(() => {
    studentRepo = new StudentRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('FindAllStudent', () => {
    it('should return all students without filters', async () => {
      (StudentModel.find as jest.Mock).mockResolvedValue([mockStudentData]);

      const result = await studentRepo.FindAllStudent();

      expect(StudentModel.find).toHaveBeenCalledWith({ isdeleted: false });
      expect(result).toEqual([mockStudentData]);
    });

    it('should return filtered students by name', async () => {
      (StudentModel.find as jest.Mock).mockResolvedValue([mockStudentData]);

      const result = await studentRepo.FindAllStudent('John');

      expect(StudentModel.find).toHaveBeenCalledWith({
        isdeleted: false,
        $or: [
          { en_name: new RegExp('John', 'i') },
          { kh_name: new RegExp('John', 'i') },
        ],
      });
      expect(result).toEqual([mockStudentData]);
    });

    it('should return filtered students by phone', async () => {
      (StudentModel.find as jest.Mock).mockResolvedValue([mockStudentData]);

      const result = await studentRepo.FindAllStudent(undefined, '123456789');

      expect(StudentModel.find).toHaveBeenCalledWith({
        isdeleted: false,
        phonenumber: new RegExp('123456789', 'i'),
      });
      expect(result).toEqual([mockStudentData]);
    });
  });

  describe('CreateStudent', () => {
    it('should create a student', async () => {
      (StudentModel.create as jest.Mock).mockResolvedValue(mockStudentData);

      const result = await studentRepo.CreateStudent(mockStudentData);

      expect(StudentModel.create).toHaveBeenCalledWith(mockStudentData);
      expect(result).toEqual(mockStudentData);
    });
  });

  describe('GetStudentById', () => {
    it('should throw an error for invalid id', async () => {
      const invalidId = 'invalidId';

      await expect(studentRepo.GetStudentById(invalidId)).rejects.toThrow(
        new BaseCustomError('Id is wrong format', StatusCode.BadRequest)
      );
    });

    it('should return a student by id', async () => {
      const validId = new mongoose.Types.ObjectId().toString();

      (StudentModel.findById as jest.Mock).mockResolvedValue(mockStudentData);

      const result = await studentRepo.GetStudentById(validId);

      expect(StudentModel.findById).toHaveBeenCalledWith(validId);
      expect(result).toEqual(mockStudentData);
    });
  });

  describe('UpdateStudent', () => {
    it('should throw an error for invalid id', async () => {
      const invalidId = 'invalidId';

      await expect(studentRepo.UpdateStudent(invalidId, {})).rejects.toThrow(
        new BaseCustomError('Id is wrong format', StatusCode.BadRequest)
      );
    });

    it('should update a student', async () => {
      const validId = new mongoose.Types.ObjectId().toString();
      const updateData = { en_name: 'Updated Name' };

      (StudentModel.findById as jest.Mock).mockResolvedValue(mockStudentData);
      (StudentModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        ...mockStudentData,
        ...updateData,
      });

      const result = await studentRepo.UpdateStudent(validId, updateData);

      expect(StudentModel.findById).toHaveBeenCalledWith(validId);
      expect(StudentModel.findByIdAndUpdate).toHaveBeenCalledWith(
        validId,
        updateData,
        { new: true }
      );
      expect(result).toEqual({ ...mockStudentData, ...updateData });
    });
  });

  describe('DeleteStudent', () => {
    it('should throw an error for invalid id', async () => {
      const invalidId = 'invalidId';

      await expect(studentRepo.DeleteStudent(invalidId)).rejects.toThrow(
        new BaseCustomError('Id is wrong format', StatusCode.BadRequest)
      );
    });

    it('should delete a student', async () => {
      const validId = new mongoose.Types.ObjectId().toString();

      (StudentModel.findById as jest.Mock).mockResolvedValue(mockStudentData);
      (StudentModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        ...mockStudentData,
        isdeleted: true,
      });

      const result = await studentRepo.DeleteStudent(validId);

      expect(StudentModel.findById).toHaveBeenCalledWith(validId);
      expect(StudentModel.findByIdAndUpdate).toHaveBeenCalledWith(
        validId,
        { isdeleted: true },
        { new: true }
      );
      expect(result).toEqual({ ...mockStudentData, isdeleted: true });
    });
  });

  describe('RegisterCourse', () => {
    it('should register a course for a student', async () => {
      const courseId = new mongoose.Types.ObjectId().toString();
      const studentId = new mongoose.Types.ObjectId().toString();
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

      (CourseModel.findById as jest.Mock).mockResolvedValue(mockCourse);
      (StudentModel.findById as jest.Mock).mockResolvedValue(mockStudent);

      const result = await studentRepo.RegisterCourse(courseId, studentId);

      expect(CourseModel.findById).toHaveBeenCalledWith(courseId);
      expect(StudentModel.findById).toHaveBeenCalledWith(studentId);
      expect(mockCourse.save).toHaveBeenCalled();
      expect(mockStudent.save).toHaveBeenCalled();
      expect(result).toEqual({
        course: 'Test Course',
        student: 'John Doe',
      });
    });
  });

  describe('RemoveCourse', () => {
    it('should remove a course from a student', async () => {
      const courseId = new mongoose.Types.ObjectId().toString();
      const studentId = new mongoose.Types.ObjectId().toString();
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

      (CourseModel.findById as jest.Mock).mockResolvedValue(mockCourse);
      (StudentModel.findById as jest.Mock).mockResolvedValue(mockStudent);

      const result = await studentRepo.RemoveCourse(courseId, studentId);

      expect(CourseModel.findById).toHaveBeenCalledWith(courseId);
      expect(StudentModel.findById).toHaveBeenCalledWith(studentId);
      expect(mockCourse.save).toHaveBeenCalled();
      expect(mockStudent.save).toHaveBeenCalled();
      expect(result).toEqual({
        course: 'Test Course',
        student: 'John Doe',
      });
    });
  });

  describe('GetStudentReport', () => {
    it('should return student report', async () => {
      const mockStudents = [
        {
          ...mockStudentData,
          courseEnrolled: [{ name: 'Test Course' }],
        },
      ];
      (StudentModel.find as jest.Mock).mockResolvedValue(mockStudents);

      const result = await studentRepo.GetStudentReport();

      expect(StudentModel.find).toHaveBeenCalledWith({ isdeleted: false });
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
    });
  });
});
