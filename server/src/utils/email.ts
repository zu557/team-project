import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  name: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.RECEIVER_EMAIL,
      pass: process.env.EMAILPASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"${options.name}" <${process.env.RECEIVER_EMAIL}>`,
    to: process.env.RECEIVER_EMAIL,
    replyTo: options.email,
    subject: `📩 New Message: ${options.subject}`,
    text: `
You have received a new message from your website contact form.

------------------------------------
Name: ${options.name}
Email: ${options.email}
${options.phone ? `Phone: ${options.phone}` : ""}
------------------------------------

Message:
${options.message}

------------------------------------
This message was automatically generated from your website form.
    `.trim(),

    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
        <h2 style="color:#444;">📩 New Contact Form Message</h2>
        <p><strong>Name:</strong> ${options.name}</p>
        <p><strong>Email:</strong> ${options.email}</p>
        ${
          options.phone ? `<p><strong>Phone:</strong> ${options.phone}</p>` : ""
        }
        <hr />
        <p style="white-space: pre-line;"><strong>Message:</strong><br/>${
          options.message
        }</p>
        <hr />
        <p style="font-size:12px; color:#777;">This email was automatically generated from your website contact form.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error("Failed to send email");
  }
}
