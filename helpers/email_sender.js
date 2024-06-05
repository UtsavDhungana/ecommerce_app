const nodemailer = require('nodemailder');

exports.sendMail = async (email, subject, body, successMessage, errorMessages) => {
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        }
    });
}