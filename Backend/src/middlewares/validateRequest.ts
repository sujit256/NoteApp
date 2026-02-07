import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import AppError from "../utils/appError";

const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((issue) => {
          const field = issue.path[issue.path.length - 1] || "unknown";
          fieldErrors[field as string] = issue.message;
        });

        return next(new AppError("Validation failed", 400, fieldErrors));
      }
      next(err);
    }
  };

export default validateRequest;
