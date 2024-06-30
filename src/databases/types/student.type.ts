
export interface IStudent{
    en_name:string;
    kh_name:string;
    dob:Date;
    gender:string;
    phonenumber:string;
    isdeleted?:boolean;
    courseEnrolled?:string[];
}