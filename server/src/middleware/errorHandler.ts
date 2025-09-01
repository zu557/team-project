import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";

interface MongoError extends Error {
  code?: number;
  path?: string;
  value?: string;
  errmsg?: string;
  errors?: Record<string, { message: string }>;
}

const handleCastErrorDB = (err: MongoError) =>
  new AppError(`Invalid ${err.path}: ${err.value}.`, 400);

const handleDuplicateFieldsDB = (err: MongoError) => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0] ?? "duplicate";
  return new AppError(`Duplicate field value: ${value}. Use another one!`, 400);
};

const handleValidationErrorDB = (err: MongoError) =>
  new AppError(
    `Invalid input data. ${Object.values(err.errors ?? {})
      .map(el => el.message)
      .join(". ")}`,
    400
  );

const sendError = (err: AppError, res: Response, dev: boolean) => {
  if (dev) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }
  if (err.isOperational) {
    return res.status(err.statusCode).json({ status: err.status, message: err.message });
  }
  console.error("ERROR 💥", err);
  res.status(500).json({ status: "error", message: "Something went very wrong!" });
};

export default (
  err: MongoError & AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode ||= 500;
  err.status ||= "error";

  let error: MongoError & AppError = { ...err, message: err.message };

  if (process.env.NODE_ENV === "production") {
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError") error = handleValidationErrorDB(error);
  }

  sendError(error, res, process.env.NODE_ENV === "development");
};
