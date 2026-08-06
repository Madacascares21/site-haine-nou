// app/server/send-email.ts
import { createServerFn } from "@tanstack/react-start";
import { resend } from "./resend";
import z from "zod";

const resendEmailSchema = z.object({
  from: z.email(),
  to: z.email(),
  subject: z.string(),
  html: z.any(),
});

export const sendResendEmail = (async ({ data }: { data: z.infer<typeof resendEmailSchema> }) => {

  const { data: result, error } = await resend.emails.send({
    from: data.from,
    to: data.to,
    subject: data.subject,
    html: data.html,
  });
  // const error = { message: "Resend email sending is currently disabled." };
  // const result = { message: "Resend email sending is currently disabled." };

  if (error) {
    throw new Error(error.message);
  }

  return result;
});