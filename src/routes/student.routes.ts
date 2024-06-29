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

// Get Student By id
studentRoute.get("/:id",async (req:Request , res:Response , next:NextFunction)=>{
    try{
        const studentId = req.params.id;
        const student =  await studentcontroller.GetStudentById(studentId);
        res.json({
            status : "success",
            message : "Student has been found !",
            data : student
        })
    }catch(error:unknown | any){
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
