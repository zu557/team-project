import { catchAsync } from "../utils/catchAsync.js";
import { sendEmail } from "../utils/email.js";

export const sendEmailHandler = catchAsync(async (req, res, next) => {
  const { name, email, message, phone, subject } = req.body;

  await sendEmail({ name, email, message, phone, subject });

  res.status(200).json({
    status: "success",
    message: "Email sent successfully",
  });
});
