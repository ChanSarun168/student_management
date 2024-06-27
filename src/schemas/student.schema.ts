import z from "zod"

const studentschema = z.object({
    en_name : z.string().min(3,"English Name must Input At least 3 Character"),
    kh_name : z.string().min(3,"Khmer Name must Input At least 3 Character"),
    dob : z.date(),
    gender: z.enum(["Male","Female","Other"]),
    phonenumber: z.string().min(5,"Phone Number must Input At least 5 Character").max(15,"Phone Number must be at most 15 characters")
})

export default studentschema;