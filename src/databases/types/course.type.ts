export interface ICourse{
    name:string;
    professor_name:string;
    limit_student:number;
    start_date:Date;
    end_date:Date;
    studentEnroll?:string[];
    isfull?:boolean;
    isdeleted?:boolean;
}