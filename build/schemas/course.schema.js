"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
// const courseschema = z.object({
//     name:z.string(),
//     professor_name:z.string().min(3,"Professor name must Input At least 3 Character"),
//     limit_student:z.number(),
//     start_date:z.date(),
//     end_date:z.date()
// });
const courseschema = zod_1.default.object({
    name: zod_1.default.string(),
    professor_name: zod_1.default.string().min(3, "Professor name must input at least 3 characters"),
    limit_student: zod_1.default.number(),
    start_date: zod_1.default.date(),
    end_date: zod_1.default.date()
}).refine(data => data.start_date < data.end_date, {
    message: "Start date must be before end date",
    path: ["end_date"], // specify the field to attach the error message to
});
exports.default = courseschema;
