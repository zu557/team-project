import { Api } from "@/utils/Api";

export interface EmailOptions {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

const sendEmail = async (data: EmailOptions) => {
  const response = await fetch(`${Api}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to send form");
  }

  return response.json();
};

export default sendEmail;
