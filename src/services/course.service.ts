import { courseRepository } from "../databases/repositories/course.repository";
import { ICourse } from "../databases/types/course.type";
import { StatusCode } from "../utils/consts";
import { BaseCustomError } from "../utils/customError";


export class courseService{
    courseRepo:courseRepository;
    constructor(){
        this.courseRepo = new courseRepository();
    }

    // get all course
    async GetAllCourse(nameFilter?: string, startDateFilter?: Date, endDateFilter?: Date){
        try{
            return await this.courseRepo.GetAllCourse(nameFilter, startDateFilter, endDateFilter);
        }catch(error:unknown | any){
            throw error;
        }
    }

    // Create new Course
    async Createcourse(Data:ICourse){
        try{
            return await this.courseRepo.CreateCourse(Data);
        }catch(error:unknown | any){
            throw error;
        }
    }

    // Update Course 
    async Updatecourse(id:string , data:object){
        try{
            return await this.courseRepo.UpdateCourse(id,data);
        }catch(error:unknown | any){
            throw error;
        }
    }

    // Delete Course
    async DeleteCourse(id:string){
        try{
            return await this.courseRepo.DeleteCourse(id);
        }catch(error:unknown | any){
            throw error;
        }
    }
}