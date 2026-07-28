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

export const sendResendEmail = createServerFn({ method: "POST" }).validator(resendEmailSchema)
  .handler(async ({ data }) => {

    const { data: result, error } = await resend.emails.send({
      from: data.from,
      to: data.to,
      subject: data.subject,
      html: data.html,
    });

    if (error) {
      throw new Error(error.message);
    }

    return result;
  });