import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { sendEmail } from "./nodemailer";
import { db } from "@/db";
import { drizzleSchema } from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: drizzleSchema
  }),
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async (
        {
          user,   // The user object
          url, // The auto-generated URL for deletion
          token  // The verification token  (can be used to generate custom URL)
        },
        request  // The original request object (optional)
      ) => {
        sendEmail({
          to: user.email,
          subject: "Delete your Account",
          text: `Click the link to delete account: ${url}`,

        });
        // Your email sending logic here
        // Example: sendEmail(data.user.email, "Verify Deletion", data.url);
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [tanstackStartCookies(), magicLink({
    sendMagicLink: async ({ email, token, url, metadata }, ctx) => {
      // send email to user
      sendEmail({
        to: email,
        subject: "Conect to your account",
        text: `Click the link to get started: ${url}`,

      });
    }
  })] // make sure this is the last plugin in the array

});



