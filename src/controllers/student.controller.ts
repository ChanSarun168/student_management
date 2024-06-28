import { NextFunction } from "express";
import { StudentService } from "../services/student.service";
import { IStudent } from "../databases/types/student.type";


export class StudentController{

    studentservice:StudentService;
    constructor(){
        this.studentservice = new StudentService();
    }

    async getAllStudent(name?: string, phone?: string):Promise<any>{

        try{
            return await this.studentservice.getAllStudent(name,phone);
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

    // Get Student By Id
    async GetStudentById(id:string):Promise<any>{
        try{
            return await this.studentservice.GetStudentById(id);
        }catch(error:unknown |any){
            throw error;
        }
    }

    // Update Student data
    async UpdateStudent(id:string , data:object):Promise<any>{
        try{
            return await this.studentservice.UpdateStudent(id , data);
        }catch(error:unknown | any){
            throw error;
        }
    }

    // Delete Student
    async DeleteStudent(id:string):Promise<any>{
        try{
            return await this.studentservice.DeleteStudent(id);
        }catch(error:unknown | any){
            throw error;
        }
    }
}