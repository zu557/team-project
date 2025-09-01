// src/utils/AppError.ts

export default class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message); // Call parent constructor (Error)

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // Mark as an operational error

    // Maintains proper stack trace for where error was thrown (only works in V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
