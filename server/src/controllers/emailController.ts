import { Request, Response, NextFunction } from 'express';
import { sendEmail } from "../utils/email.js";

/**
 * Defines the structure for the email payload, matching the expected
 * properties from the request body.
 */
interface EmailPayload {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
}

/**
 * Handles the sending of an email.
 * This version uses a native try-catch block for error handling.
 */
export const sendEmailHandler = async (req: Request<{}, {}, EmailPayload>, res: Response, next: NextFunction) => {
  try {
    // Destructure the payload from the request body.
    const { name, email, message, phone, subject } = req.body;

    // Use the nullish coalescing operator (??) to provide a default empty string
    // if subject or phone are undefined, satisfying the type requirement of sendEmail.
    await sendEmail({ 
      name, 
      email, 
      message, 
      phone: phone ?? '', // Fix for 'phone' error
      subject: subject ?? 'No Subject Provided' // Fix for 'subject' error
    });

    // Send a success response.
    res.status(200).json({
      status: "success",
      message: "Email sent successfully",
    });
  } catch (error) {
    // Pass the error to the global error handler middleware.
    next(error);
  }
};
