import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";
import type { CartItemSchemaType, OrderCartItemSchemaType } from "#/features/cart/schema";
import { requireAuth } from "#/lib/auth.functions";
import { contactFormSchema } from "../-components/form";
import { sendResendEmail } from "#/lib/sendResendEmail";


export const contactUsServerFn = createServerFn().validator(contactFormSchema).handler(async ({ data }) => {
    sendResendEmail({
        data: {
            from: data.email,
            to: "contact@auxload-store.ro",
            subject: data.subject,
            html: `<p>${data.message}</p>`
        }
    })
    return { ok: true, message: "Mesajul a fost trimis cu succes!" }
})


