"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const StudentSchema = new mongoose_1.default.Schema({
    en_name: { type: String, required: true },
    kh_name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    phonenumber: { type: String, required: true, unique: true },
    isdeleted: { type: Boolean, default: false },
    courseEnrolled: [{ type: String, ref: "Course" }],
}, {
    toJSON: {
        transform(_doc, ret) {
            delete ret._id;
            delete ret.__v;
        },
    },
});
exports.StudentModel = mongoose_1.default.model("Student", StudentSchema);
