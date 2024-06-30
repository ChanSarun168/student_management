import { StudentRepository } from "../databases/repositories/student.repository";
import { IStudent } from "../databases/types/student.type";

export class StudentService{
    studentRepo: StudentRepository;
    constructor(){
        this.studentRepo = new StudentRepository();
    }

    // Get all Student
    async getAllStudent(name?: string, phone?: string){
        try{
            return await this.studentRepo.FindAllStudent(name,phone);
        }catch(error:unknown | any){
            throw error;
        }
    }

    // add student to database
    async AddStudent(data:IStudent){
        try{
            return await this.studentRepo.CreateStudent(data);
        }catch(error:unknown | any){
            throw error;   
        }
    }

    // Get student By Id
    async GetStudentById(id:string){
        try{
            return await this.studentRepo.GetStudentById(id)
        }catch(error:unknown | any){
            throw error;
        }
    }

    // Update student Info

    async UpdateStudent(id:string , data:object){
        try{
            return await this.studentRepo.UpdateStudent(id , data);
        }catch(error:unknown | any){
            throw error;
        }
    }

    // Delete student
    async DeleteStudent(id:string){
        try{
            return await this.studentRepo.DeleteStudent(id);
        }catch(error:unknown | any){
            throw error;
        }
    }

    // Register course for student
    async RegisterCourse(courseId:string ,  studentId:string){
        try{
            return await this.studentRepo.RegisterCourse(courseId , studentId);
        }catch(error:unknown | any){
            throw error;
        }
    }

    // Remove course for student
    async RemoveCourse(courseId:string ,  studentId:string){
        try{
            return await this.studentRepo.RemoveCourse(courseId , studentId);
        }catch(error:unknown | any){
            throw error;
        }
    }

    // Get Report of Student
    async getStudentReport(){
        try{
            return await this.studentRepo.GetStudentReport();
        }catch(error:unknown | any){
            throw error;
        }
    } 
}