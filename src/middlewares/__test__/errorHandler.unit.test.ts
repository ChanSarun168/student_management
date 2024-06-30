import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../errorHandler";

describe("errorHandler middleware", () => {
  it("should set the response status and send a JSON error message", () => {
    const req = {} as Request;
    const res = {
      statusCode: 500,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const error = new Error("Test error");

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      statusCode: 500,
      message: "Test error",
    });
    expect(next).toHaveBeenCalled();
  });

  it("should set the response status to 500 if not provided and send a JSON error message", () => {
    const req = {} as Request;
    const res = {
      statusCode: undefined,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const error = new Error("Test error");

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      statusCode: 500,
      message: "Test error",
    });
    expect(next).toHaveBeenCalled();
  });
});
