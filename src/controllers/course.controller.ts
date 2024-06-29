import { ICourse } from "../databases/types/course.type";
import { courseService } from "../services/course.service";

export class CourseController{

    courseservice:courseService;
    constructor(){
        this.courseservice = new courseService();
    }

    // Get ALL Course
    async GetAllCourse(nameFilter?: string, startDateFilter?: Date, endDateFilter?: Date):Promise<any>{
        try{
            return await this.courseservice.GetAllCourse(nameFilter , startDateFilter , endDateFilter);
        }catch(error:unknown |any){
            throw error;
        }
    }

    // Create new Course
    async CreateCourse(data:ICourse):Promise<any>{
        try{
            return await this.courseservice.Createcourse(data);
        }catch(error:unknown | any){
            throw error;            
        }
    }

    // Update Course data
    async UpdateCourse(id:string , data:object){
        try{
            return await this.courseservice.Updatecourse(id , data);
        }catch(error:unknown | any){
            throw error;
        }
    }

    // Delete Course
    async DeleteCourse(id:string){
        try{
            return await this.courseservice.DeleteCourse(id);
        }catch(error:unknown | any){
            throw error;
        }
    }
}