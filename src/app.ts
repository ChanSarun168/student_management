import express from "express";
import bodyParser from "body-parser";
import { studentRoute } from "./routes/student.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { courseRoute } from "./routes/course.routes";
import { BaseCustomError } from "./utils/customError";

export const app = express();

// Get the Configs!
// const config = getConfig(process.env.NODE_ENV);
app.use(express.json());
// Use body-parser to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/v1/student" , studentRoute);
app.use("/v1/course",courseRoute);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404);
    const error = new BaseCustomError("Not Found", 404);
    next(error);
});

// global error
app.use(errorHandler);
