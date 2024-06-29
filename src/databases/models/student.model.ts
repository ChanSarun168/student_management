import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    en_name : {type:String , required:true},
    kh_name : {type:String , required:true},
    dob : { type:Date , required:true},
    gender: {type:String , enum:["Male","Female","Other"] , required:true},
    phonenumber: { type: String, required: true, unique: true },
    isdeleted: { type: Boolean, default: false },
    courseEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
},
{
    toJSON: {
      transform(_doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
})

export const StudentModel = mongoose.model("Student", StudentSchema);