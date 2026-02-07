import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "../utils/appError";

// Mongoose error handlers
const handleCastError = (err: any) => new AppError(`Invalid ${err.path}: ${err.value}`, 400);
const handleDuplicateKeyError = (err: any) => {
  const field = Object.keys(err.keyValue)[0];
  return new AppError(`Duplicate value for ${field}`, 400);
};
const handleValidationError = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  return new AppError(errors.join(". "), 400);
};

// Development error
const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode || 500).json({
    success: false,
    status: err.status,
    message: err.message,
    stack: err.stack,
    errors: err.errors,
  });
};

// Production error
const sendErrorProd = (err: any, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  } else {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err instanceof ZodError) {
    const fieldErrors: Record<string, string> = {};
    err.errors.forEach((issue) => {
      const field = issue.path[0] || "unknown";
      fieldErrors[field as string] = issue.message;
    });
    err = new AppError("Validation failed", 400, fieldErrors);
  }

  if (process.env.NODE_ENV === "development") sendErrorDev(err, res);
  else sendErrorProd(err, res);
};

export default globalErrorHandler;
