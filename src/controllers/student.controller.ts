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

    // Register Course for student
    async Registercourse(courseId:string , studentId:string):Promise<any>{
        try{
            return await this.studentservice.RegisterCourse(courseId , studentId)
        }catch(error:unknown | any){
            throw error;
        }
    }

    // remove Course for Student
    async RemoveCourse(courseId:string , studentId:string):Promise<any>{
        try{
            return await this.studentservice.RemoveCourse(courseId , studentId)
        }catch(error:unknown | any){
            throw error;
        }
    }

    // Get Course Report
    async GetStudentReport():Promise<any>{
        try{
            return await this.studentservice.getStudentReport();
        }catch(error:unknown | any){
            throw error;
        }
    }
}