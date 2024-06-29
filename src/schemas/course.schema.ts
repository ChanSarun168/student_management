import z from "zod"

// const courseschema = z.object({
//     name:z.string(),
//     professor_name:z.string().min(3,"Professor name must Input At least 3 Character"),
//     limit_student:z.number(),
//     start_date:z.date(),
//     end_date:z.date()
// });
const courseschema = z.object({
    name: z.string(),
    professor_name: z.string().min(3, "Professor name must input at least 3 characters"),
    limit_student: z.number(),
    start_date: z.date(),
    end_date: z.date()
}).refine(data => data.start_date < data.end_date, {
    message: "Start date must be before end date",
    path: ["end_date"], // specify the field to attach the error message to
});

export default courseschema;