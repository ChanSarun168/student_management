import { NextFunction, Router , Request , Response } from "express";
import { StudentController } from "../controllers/student.controller";
import { BaseCustomError } from "../utils/customError";
import { StatusCode } from "../utils/consts";

export const studentRoute = Router();
const studentcontroller = new StudentController();

// get all user
studentRoute.get("/" , async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const student = await studentcontroller.getAllStudent();

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
studentRoute.post("/" ,async (req:Request , res:Response, next:NextFunction)=>{
    try{
        const data = req.body;
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
