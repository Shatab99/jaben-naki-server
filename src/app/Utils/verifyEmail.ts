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
        subject: "Verify your email", // Subject line
        text: "Please click or press the link to verify your email", // plain text body
        html: `<b>${html}</b>`, // html body
    });
}

export default sendVerifyEmail;