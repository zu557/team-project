import { useMutation } from "@tanstack/react-query";
import sendEmail, { EmailOptions } from "./SendEmail";
import { toast } from "sonner";

export const useSendEmail = () => {
  const mutation = useMutation({
    mutationFn: (data: EmailOptions) => sendEmail(data),
    onSuccess: () => {
      toast.success("Message sent successfully", {
        className: "bg-green-600 text-white",
      });
    },
    onError: () => {
      toast.error("Failed to send message. Try again later");
    },
  });

  return mutation;
};