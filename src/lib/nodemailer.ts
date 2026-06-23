import { site } from "#/features/header/constant";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export async function sendEmail({
    to,
    subject,
    text,
    html,
}: {
    to: string;
    subject: string;
    text: string;
    html?: string;
}) {
    const info = await transporter.sendMail({
        from: `${site.name} <${process.env.GMAIL_USER}>`,
        to,
        subject,
        text,
        html,
    });

    return info;
}
