# student_management

<details>
  <summary>Table of Contents</summary>

- [About The Project](#about-the-project)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Validation](#Validation)
- [Contact](#contact)

</details>

## About The Project
A web application to manage student data, courses, and enrollments using Express.js, TypeScript, and MongoDB.
###  Feature
- CRUD operations for students and courses
- Enrollment of students in courses
- Soft delete for students and courses
- Advanced search and filtering for courses and student
### Technologies use
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Jest
- Supertest
## Getting Started
### Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB installed and running

### Installation
1. Clone Repository
```bash
git clone https://github.com/ChanSarun168/student_management.git
cd student_management
```
2. Install Dependecies
- use npm
```bash
npm install
```
- use yarn
```bash
yarn install
```
3. Input .env variables in configs/.env
```bash
 NODE_ENV=xxxx
 LOG_LEVEL=xxxx
 MONGODB_URL=your_mongodb_url
 PORT=xxxx
```
## Usage
1. Start server
```bash
yarn dev
```
or
```bash
npm run dev
```
2. Testing
```bash
yarn test
```
or
```bash
npm run test
```

### End point
1. CRUD Student
- List All Student : `GET /v1/student`
 - Query Parameters:
    - name (optional): Filter students by en_name or kh_name (case-insensitive).
    - phone (optional): Filter student by phonenumber
  Example
  ```bash
  GET /v1/student?name=run&phonenumber=0978419624
  GET /v1/student?name=run
  GET /v1/student?phonenumber=0978419624
  ```
- Create new Student : `POST /v1/student`
- Update Student data : `PUT /v1/student/{studentId}`
- Delete Student : `DELETE /v1/student/{studentId}`
2. CRUD Course
- List All Course : `GET /v1/course`
  - Query Parameters:
    - name (optional): Filter courses by name (case-insensitive).
    - start_date (optional): Filter courses starting on or after this date.
    - end_date (optional): Filter courses ending on or before this date.
  Example
  ```bash
  GET /v1/course?name=math&start_date=2023-06-01&end_date=2023-12-31
  ```
- Create new Course : `POST /v1/course`
- Update course data : `PUT /v1/course/{courseId}`
- Delete course : `DELETE /v1/course/{courseId}`
3. Register and Romove Course for student
- Register : `POST /v1/student/register/{studentId}/course/{courseId}`
- Remove   : `POST /v1/student/remove/{studentId}/course/{courseId}`
4. Report
- student report : `GET /v1/student/report`
- course report : `GET /v1/course/report`

## Validation
- Student Validation
en_name : Must be a non-empty string.<br>
kh_name : Must be a non-empty string.<br>
dob :Must be a valid date.<br>
gender:  Must be either "Male", "Female", or “Other” valid options.<br>
phonenumber: Must be a valid phone number format.<br>
courseEnrolled :  Must be the array of valid courseId and course can't be repeated.<br>

- Course Validation
name: Must be a non-empty string.<br>
professor_name : Must be a non-empty string.<br>
limit_student : Must be a number.<br>
start_date : Must be a valid date.<br>
end_date : Must be a valid date.<br>
studentEnroll: Must be the array of valid studentId and course can't be repeated.<br>

## Contact
-email [chansarun0@gmail.com](chansarun0@gmail.com)
