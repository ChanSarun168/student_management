import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    name: {type:String , required:true},
    professor_name : {type:String , required:true},
    limit_student : {type:Number , required:true},
    start_date : {type:Date , required:true},
    end_date : {type:Date , required:true},
    studentEnroll: [{ type: String, ref: "Course" }],
    isfull : {type:Boolean , default:false},
    isdeleted: {type:Boolean , default:false}
},
{
    toJSON: {
      transform(_doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
})

export const CourseModel = mongoose.model("Course" , CourseSchema);

