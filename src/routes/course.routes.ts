import { NextFunction, Router , Request , Response } from "express";
import { CourseController } from "../controllers/course.controller";
import { BaseCustomError } from "../utils/customError";
import { StatusCode } from "../utils/consts";
import { validateInputData } from "../middlewares/validateInput";
import courseschema from "../schemas/course.schema";
import { ICourse } from "../databases/types/course.type";
import parseDates from "../middlewares/parseDate";


export const courseRoute = Router();
const coursecontroller = new CourseController();

// Get All Course
courseRoute.get("/" ,async (req:Request  , res: Response , next:NextFunction)=>{
    try{
        const { name, start_date, end_date } = req.query;

        // Convert query parameters to appropriate types
        const nameFilter = name ? String(name) : undefined;
        const startDateFilter = start_date ? new Date(String(start_date)) : undefined;
        const endDateFilter = end_date ? new Date(String(end_date)) : undefined;

        const courses = await coursecontroller.GetAllCourse(nameFilter , startDateFilter , endDateFilter);
        if(courses.length > 0){
            res.json({
                status: "success",
                message: "Courses have been found!!",
                data: courses
            })
        }else{
            throw new BaseCustomError("No Course in Database", StatusCode.NoContent);
        }
    }catch(error:unknown | any){
        next(error);
    }
})

// Create new Course
courseRoute.post("/", parseDates ,validateInputData(courseschema) , async (req:Request , res:Response , next:NextFunction)=>{
    try{
        const {name , professor_name , limit_student , start_date , end_date} = req.body;

        const data:ICourse = {
            name,
            professor_name,
            limit_student,
            start_date,
            end_date
        }
        const course = await coursecontroller.CreateCourse(data);
        res.json({
            status : "Success",
            message : "Course has been create successfully",
            data:course
        })
    }catch(error:unknown |any){
        next(error);
    }
})

// Update data
courseRoute.put("/:id" , async (req:Request , res:Response ,next:NextFunction)=>{
    try{
        const course = await coursecontroller.UpdateCourse(req.params.id , req.body);
        res.json({
            status : "Succcess",
            message: "Course has been update successfully",
            data : course
        })
    }catch(error:unknown | any){
        next(error)
    }
})

// Delete Course
courseRoute.delete("/:id" , async (req:Request , res:Response , next:NextFunction)=>{
    try{
        const course = await coursecontroller.DeleteCourse(req.params.id);
        res.json({
            status: "success",
            message: "Course has been delete successfully"
        })
    }catch(error:unknown | any){
        next(error);
    }
})