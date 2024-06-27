import { StudentModel } from "../models/student.model";
import { IStudent } from "../types/student.type";

export class StudentRepository{

    // Get All Student
    async FindAllStudent(){
        try{
            const student = await StudentModel.find({}).where({isdeleted: false});
            return student;
        }catch(error:unknown |any){
            throw error;
        }
    }

    // Add student to Database
    async CreateStudent(data:IStudent){
        try{
            const newStudent =  await StudentModel.create(data);
            return newStudent;
        }catch(error:unknown |any){
            throw error;
        }
    }
}