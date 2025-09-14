import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = (email, url) => {
  return transporter.sendMail({
    to: email,
    subject: "Verify your account",
    html: `Klik link ini untuk verifikasi: <a href="${url}">${url}</a>`,
  });
};
