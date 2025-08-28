import type { Request, Response, NextFunction } from "express";
import { AppError } from "./AppEror.js";

const sendProduction = (err: AppError, res: Response) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  res.status(500).json({
    status: "error",
    message: "something wrong",
  });
};
const sendDevelopemnt = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
export const globalError = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;
  const error = { ...err };
  if (process.env.NODE_ENV === "production") {
    sendProduction(error, res);
  }
  if (process.env.NODE_ENV === "developemnt") {
    sendDevelopemnt(error, res);
  }
};
