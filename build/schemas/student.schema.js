"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const studentschema = zod_1.default.object({
    en_name: zod_1.default.string().min(3, "English Name must Input At least 3 Character"),
    kh_name: zod_1.default.string().min(3, "Khmer Name must Input At least 3 Character"),
    dob: zod_1.default.date(),
    gender: zod_1.default.enum(["Male", "Female", "Other"]),
    phonenumber: zod_1.default.string().min(5, "Phone Number must Input At least 5 Character").max(15, "Phone Number must be at most 15 characters")
});
exports.default = studentschema;
