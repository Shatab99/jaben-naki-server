// emkl cctq cblm odxi
import nodemailer from "nodemailer"
import config from "../config";


const sendVerifyEmail = async (to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "shatabag4749@gmail.com",
            pass: config.smtpSecret,
        },
    });
    await transporter.sendMail({
        from: 'shatabag4749@gmail.com', // sender address
        to, // list of receivers
        subject: "Verify your email from JABEN NAKI", // Subject line
        html: `
        <div style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
            <h2>Welcome!</h2>
            <p>Click the button below to verify your email and activate your account:</p>
            <a href="${html}" style="display: inline-block; text-decoration: none; color: white; background-color: #4CAF50; padding: 12px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                Verify Email
            </a>
            <p style="margin-top: 20px; color: #555;">If you did not create an account, you can ignore this email.</p>
        </div>
    `, // html body
    });
}

export default sendVerifyEmail;