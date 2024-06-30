import express from "express";
import request from "supertest";
import { errorHandler } from "../errorHandler";
import { BaseCustomError } from "../../utils/customError";

// Setup an Express app with routes to test the error handler
const app = express();

// Example route that throws an error
app.get("/error", (req, res, next) => {
  const error = new Error("Test error");
  next(error);
});

// Global error handler middleware
app.use(errorHandler);

describe("Integration tests for errorHandler middleware", () => {
  it("should handle errors and respond with a JSON error message", async () => {
    const response = await request(app).get("/error");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      statusCode: 500,
      message: "Test error",
    });
  });

  it("should handle 404 errors and respond with a JSON error message", async () => {

    const response = await request(app).get("/non-existing-route");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      statusCode: 404,
      message: "Not Found",
    });
  });
});
