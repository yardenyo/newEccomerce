import nodemailer from 'nodemailer';

interface SendEmailProps {
    to: string;
    subject: string;
    text: string;
    html: string;
}

export const sendEmail = async (data: SendEmailProps) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: '"Hey 👋" <gmloler@gmail.com>',
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.html,
    });

    console.log('Message sent successfully');
};

export default sendEmail;
