import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

export const sendEmail = async (to, subject, html) => {
  return await transporter.sendMail({
    from: `"LMS" <raniaraafat421@gmail.com>`,
    to,
    subject,
    html,
  });
};