import { NextFunction, Router , Request , Response } from "express";
import { StudentController } from "../controllers/student.controller";
import { BaseCustomError } from "../utils/customError";
import { StatusCode } from "../utils/consts";
import { IStudent } from "../databases/types/student.type";
import parseDates from "../middlewares/parseDate";
import { validateInputData } from "../middlewares/validateInput";
import studentschema from "../schemas/student.schema";

export const studentRoute = Router();
const studentcontroller = new StudentController();

// get all user
studentRoute.get("/" , async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const { name, phone } = req.query;
        const student = await studentcontroller.getAllStudent(name as string, phone as string);

        if(student.length > 0){
            res.json({
                status: "success",
                message: "students have been found!!",
                data: student 
            })
        }else{
            throw new BaseCustomError("No Student in Database", StatusCode.NoContent);
        }

    }catch(error){
        next(error);
    }
})

// Create Student
studentRoute.post("/" , parseDates ,validateInputData(studentschema), async (req:Request , res:Response, next:NextFunction)=>{
    try{
        const {en_name , kh_name , dob , gender , phonenumber } = req.body
        const data:IStudent = {
            en_name,
            kh_name,
            dob,
            gender,
            phonenumber
        }
        const newStudent = await studentcontroller.CreateStudent(data);
        res.json({
            status:"Success",
            message:"Student created!!",
            data:newStudent
        })
    }catch(error){
        next(error);
    }
})

// Update Student Info
studentRoute.put("/:id",async (req:Request , res:Response , next:NextFunction)=>{
    try{
        const studentId = req.params.id;
        const data = req.body;
        const updateStudent = await studentcontroller.UpdateStudent(studentId,data);
        res.json({
            status : "Success",
            message : "Student has been updated successfully",
            data : updateStudent
        })
    }catch(error:unknown | any){
        next(error);
    }
})

// Get Student By id
studentRoute.delete("/:id",async (req:Request , res:Response , next:NextFunction)=>{
    try{
        const studentId = req.params.id;
        const student =  await studentcontroller.DeleteStudent(studentId);
        res.json({
            status : "success",
            message : "Student has been Delete!",
        })
    }catch(error:unknown | any){
        next(error);
    }
})

// register course for student
studentRoute.post("/register/:studentId/course/:courseId" , async (req:Request ,res:Response , next:NextFunction)=>{
    try{
        const courseId = req.params.courseId;
        const studentId = req.params.studentId;

        const register = await studentcontroller.Registercourse(courseId , studentId);
        res.json({
            status : "success",
            message : `${register.student} has been register course : ${register.course}`
        })
    }catch(error:unknown | any){
        next(error);
    }
})

// Remove course for Student
studentRoute.post("/remove/:studentId/course/:courseId" , async (req:Request ,res:Response , next:NextFunction)=>{
    try{
        const courseId = req.params.courseId;
        const studentId = req.params.studentId;

        const register = await studentcontroller.RemoveCourse(courseId , studentId);
        res.json({
            status : "Remove success",
            message : `${register.student} has been Remove course : ${register.course}`
        })
    }catch(error:unknown | any){
        next(error);
    }
})

// Get Course Report
studentRoute.get("/report" ,async (req:Request , res:Response , next:NextFunction)=>{
    try{
        const reportData = await studentcontroller.GetStudentReport();
        res.json({
            status: "success",
            message: "Here the Student Report",
            AmountOfStudent : reportData.studentCount,
            report:reportData.report
        })
    }catch(error:unknown | any){
        next(error);
    }
})

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