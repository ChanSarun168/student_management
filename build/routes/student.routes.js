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
exports.studentRoute = void 0;
const express_1 = require("express");
const student_controller_1 = require("../controllers/student.controller");
const customError_1 = require("../utils/customError");
const consts_1 = require("../utils/consts");
const parseDate_1 = __importDefault(require("../middlewares/parseDate"));
const validateInput_1 = require("../middlewares/validateInput");
const student_schema_1 = __importDefault(require("../schemas/student.schema"));
exports.studentRoute = (0, express_1.Router)();
const studentcontroller = new student_controller_1.StudentController();
// get all user
exports.studentRoute.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone } = req.query;
        const student = yield studentcontroller.getAllStudent(name, phone);
        if (student.length > 0) {
            res.json({
                status: "success",
                message: "students have been found!!",
                data: student
            });
        }
        else {
            throw new customError_1.BaseCustomError("No Student in Database", consts_1.StatusCode.NoContent);
        }
    }
    catch (error) {
        next(error);
    }
}));
// Create Student
exports.studentRoute.post("/", parseDate_1.default, (0, validateInput_1.validateInputData)(student_schema_1.default), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { en_name, kh_name, dob, gender, phonenumber } = req.body;
        const data = {
            en_name,
            kh_name,
            dob,
            gender,
            phonenumber
        };
        const newStudent = yield studentcontroller.CreateStudent(data);
        res.json({
            status: "Success",
            message: "Student created!!",
            data: newStudent
        });
    }
    catch (error) {
        next(error);
    }
}));
// Update Student Info
exports.studentRoute.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        const data = req.body;
        const updateStudent = yield studentcontroller.UpdateStudent(studentId, data);
        res.json({
            status: "Success",
            message: "Student has been updated successfully",
            data: updateStudent
        });
    }
    catch (error) {
        next(error);
    }
}));
// Get Student By id
exports.studentRoute.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        const student = yield studentcontroller.DeleteStudent(studentId);
        res.json({
            status: "success",
            message: "Student has been Delete!",
        });
    }
    catch (error) {
        next(error);
    }
}));
// register course for student
exports.studentRoute.post("/register/:studentId/course/:courseId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const studentId = req.params.studentId;
        const register = yield studentcontroller.Registercourse(courseId, studentId);
        res.json({
            status: "success",
            message: `${register.student} has been register course : ${register.course}`
        });
    }
    catch (error) {
        next(error);
    }
}));
// Remove course for Student
exports.studentRoute.post("/remove/:studentId/course/:courseId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const studentId = req.params.studentId;
        const register = yield studentcontroller.RemoveCourse(courseId, studentId);
        res.json({
            status: "Remove success",
            message: `${register.student} has been Remove course : ${register.course}`
        });
    }
    catch (error) {
        next(error);
    }
}));
// Get Course Report
exports.studentRoute.get("/report", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reportData = yield studentcontroller.GetStudentReport();
        res.json({
            status: "success",
            message: "Here the Student Report",
            AmountOfStudent: reportData.studentCount,
            report: reportData.report
        });
    }
    catch (error) {
        next(error);
    }
}));
// // Get Student By id
// studentRoute.get("/:id",async (req:Request , res:Response , next:NextFunction)=>{
//     try{
//         const studentId = req.params.id;
//         console.log("hi from get by id");
//         const student =  await studentcontroller.GetStudentById(studentId);
//         res.json({
//             status : "success",
//             message : "Student has been found !",
//             data : student
//         })
//     }catch(error:unknown | any){
//         console.log("error: " , error.StatusCode);
//         console.log("error:" , error)
//         next(error);
//     }
// })
