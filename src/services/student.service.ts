import { StudentRepository } from "../databases/repositories/student.repository";
import { IStudent } from "../databases/types/student.type";

export class StudentService{
    studentRepo: StudentRepository;
    constructor(){
        this.studentRepo = new StudentRepository();
    }

    // Get all Student

    async getAllStudent(){
        try{
            return await this.studentRepo.FindAllStudent();
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
}