import mongoose from "mongoose";
import { StudentModel } from "../models/student.model";
import { IStudent } from "../types/student.type";
import { BaseCustomError } from "../../utils/customError";
import { StatusCode } from "../../utils/consts";

export class StudentRepository{

    // Get All Student
    async FindAllStudent(name?: string, phone?: string){
        try {
            let query: any = { isdeleted: false };

            if (name) {
                query.$or = [
                    { en_name: new RegExp(name, 'i') },
                    { kh_name: new RegExp(name, 'i') }
                ];
            }

            if (phone) {
                query.phonenumber = new RegExp(phone, 'i');
            }

            const students = await StudentModel.find(query);
            return students;
        } catch (error: unknown | any) {
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

    // Get Student by Id
    async GetStudentById(id:string){
        try{
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new BaseCustomError('Id is wrong format', StatusCode.BadRequest);
            }
            const student = await StudentModel.findById(id);
            if(!student){
                const customError = new BaseCustomError('Student not found. Please check the provided ID.', StatusCode.NoContent); // Create custom error
                throw customError;
            }
            return student
        }catch(error:unknown | any){
            throw error;
        }
    }

    // update Student Info
    async UpdateStudent(id:string , data:object){
        try{

            // check if Id is invalid from mongodb 
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new BaseCustomError('Id is wrong format', StatusCode.BadRequest);
            }

            // check db to find student
            const student = await StudentModel.findById(id);
            if(!student){
                const customError = new BaseCustomError('Student not found. Please check the provided ID.', StatusCode.NoContent); // Create custom error
                throw customError;
            }

            const updatestudent = await StudentModel.findByIdAndUpdate(id , data , {new:true})
            return updatestudent;

        }catch(error:unknown |any){
            throw error;
        }
    }

    // Delete student (soft delete)
    async DeleteStudent(id:string){
        try{
            // check if Id is invalid from mongodb 
            if (!mongoose.Types.ObjectId.isValid(id)) {
               throw new BaseCustomError('Id is wrong format', StatusCode.BadRequest);
           }
   
           // check db to find student
           const student = await StudentModel.findById(id);
           if(!student){
               const customError = new BaseCustomError('Student not found. Please check the provided ID.', StatusCode.NoContent); // Create custom error
               throw customError;
           }
   
           return await StudentModel.findByIdAndUpdate(id , {isdeleted:true} , {new:true});
        }catch(error:unknown | any){
            throw error;
        }
    }
}