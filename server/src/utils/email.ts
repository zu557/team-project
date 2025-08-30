import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface EmailOptions {
  email: string;
  name: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const msg = {
    to: process.env.RECEIVER_EMAIL!,
    from: process.env.SENDER_EMAIL!,
    subject: options.subject,
    text: [
      `Name: ${options.name}`,
      `Email: ${options.email}`,
      `Phone: ${options.phone || "N/A"}`,
      `Message: ${options.message}`,
    ].join("\n"),
    html: `
      <p><strong>Name:</strong> ${options.name}</p>
      <p><strong>Email:</strong> ${options.email}</p>
      <p><strong>Phone:</strong> ${options.phone || "N/A"}</p>
      <p><strong>Message:</strong><br/>${options.message}</p>
    `,
  };

  try {
    await sgMail.send(msg);
  } catch (error: any) {
    throw new Error("Failed to send email");
  }
}
