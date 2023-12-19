// import { env } from "@/env.mjs";
import { env } from "@/env.js";
import type { EmailPayload } from "@/types";
import nodemailer from "nodemailer";


const smtpOptions = {
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  // secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport({
  ...smtpOptions,
});

export const sendEmail = async (data: EmailPayload) => {
  return await transporter.sendMail({
    from: {
      name: "SpringSense",
      address: env.SMTP_USER,
    },
    ...data,
  });
};
