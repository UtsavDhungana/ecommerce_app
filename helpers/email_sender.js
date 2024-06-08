const nodemailer = require('nodemailer');

exports.sendMail = async function(email, subject, body,) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            }
        });
    
        const mailOptios = {
            from: process.env.Email,
            to: email,
            subject: subject,
            text: body,
        };
    
        return transporter.sendMail(mailOptios, (error, info)=> {
            if(error) {
                console.error("Error sending email:", error);
                return reject(Error("Error sending email!."));
            }
            console.log("Email sent:", info.response);
            return resolve("Password reset OTP send to your email");
        });
    });
}