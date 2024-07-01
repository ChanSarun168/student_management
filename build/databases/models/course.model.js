"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CourseSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    professor_name: { type: String, required: true },
    limit_student: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    studentEnroll: [{ type: String, ref: "Course" }],
    isfull: { type: Boolean, default: false },
    isdeleted: { type: Boolean, default: false }
}, {
    toJSON: {
        transform(_doc, ret) {
            delete ret._id;
            delete ret.__v;
        },
    },
});
exports.CourseModel = mongoose_1.default.model("Course", CourseSchema);
