import request from 'supertest';
import {app} from '../../app';
import { CourseModel } from '../../databases/models/course.model'; // Adjust the path
import { ICourse } from '../../databases/types/course.type';

jest.mock('../../databases/models/course.model'); // Mock the CourseModel

const mockCourseData: ICourse = {
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

  it('should get all courses', async () => {
    CourseModel.find = jest.fn().mockResolvedValue([mockCourseData]);

    const response = await request(app).get('/v1/course');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "success",
      message: "Courses have been found!!",
      data: [mockCourseData]
    });
  });

  it('should create a new course', async () => {
    CourseModel.create = jest.fn().mockResolvedValue(mockCourseData);

    const response = await request(app)
      .post('/courses')
      .send(mockCourseData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "Success",
      message: "Course has been create successfully",
      data: mockCourseData
    });
  });

  it('should update a course', async () => {
    const updatedCourse = { ...mockCourseData, name: "Updated Course" };
    CourseModel.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedCourse);

    const response = await request(app)
      .put(`/v1/course/1`)
      .send(updatedCourse);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "Succcess",
      message: "Course has been update successfully",
      data: updatedCourse
    });
  });

  it('should delete a course', async () => {
    CourseModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockCourseData);

    const response = await request(app)
      .delete(`v1/course/1`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "success",
      message: "Course has been delete successfully"
    });
  });

  it('should get course report', async () => {
    const report = [mockCourseData];
    CourseModel.find = jest.fn().mockResolvedValue(report);

    const response = await request(app)
      .get('/v1/course/report');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "success",
      message: "Here the Course Report",
      report
    });
  });
});
