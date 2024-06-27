import { NextFunction } from "express";
import { StudentService } from "../services/student.service";
import { IStudent } from "../databases/types/student.type";


export class StudentController{

    studentservice:StudentService;
    constructor(){
        this.studentservice = new StudentService();
    }

    async getAllStudent():Promise<any>{

        try{
            return await this.studentservice.getAllStudent();
        }catch(error:unknown | any){
            throw error;
        }

    }

    // Create Student

    async CreateStudent(data:IStudent):Promise<any>{
        try{
            return await this.studentservice.AddStudent(data);
        }catch(error:unknown | any){
            throw error;
        }
    }
}