import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email, url) => {
  try {
    const LOGO_URL =
      "https://ik.imagekit.io/ginvitations/assets/logo/Logo_with_text_GInvitations_v1_1.png";

    const htmlTemplate = `
  <div style="
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f4f4f7;
    padding: 40px 0;
    text-align: center;
  ">
    <div style="
      background-color: #ffffff;
      max-width: 500px;
      margin: auto;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    ">

      <!-- Header Logo -->
      <div style="margin-bottom: 25px;">
        <img 
          src="${LOGO_URL}" 
          alt="Logo" 
          style="max-width: 180px; height: auto; border-radius: 6px;"
        />
      </div>

      <h2 style="color: #333; margin-bottom: 20px;">
        Verifikasi Akun Kamu 🚀
      </h2>

      <p style="color: #555; line-height: 1.6;">
        Terima kasih telah mendaftar!<br>
        Klik tombol di bawah ini untuk memverifikasi email kamu dan mulai menggunakan akunmu.
      </p>

      <a href="${url}" style="
        display: inline-block;
        margin-top: 20px;
        padding: 12px 25px;
        background-color: #007bff;
        color: #fff;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
      ">
        Verifikasi Sekarang
      </a>

      <p style="color: #777; font-size: 12px; margin-top: 25px;">
        Jika tombol di atas tidak berfungsi, salin dan buka link ini di browser kamu:
      </p>

      <p style="
        color: #007bff;
        font-size: 12px;
        word-break: break-all;
      ">
        ${url}
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
      <p style="color: #aaa; font-size: 11px;">
        Email ini dikirim otomatis oleh sistem.<br>
        Jangan balas pesan ini.
      </p>
    </div>
  </div>
  `;

    return transporter.sendMail({
      from: `"Ginvitations" <${EMAIL_USER}>`,
      to: email,
      subject: "Verifikasi Akun Kamu",
      html: htmlTemplate,
    });
  } catch (error) {
    return console.log(error);
  }
};
