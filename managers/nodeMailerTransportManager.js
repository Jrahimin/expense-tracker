const nodeMailer = require('nodemailer');

const nodeMailerTransportManager = () => {
    return nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAIL_TRAP_USER,
            pass: process.env.MAIL_TRAP_PASS
        }
    });
}

module.exports = nodeMailerTransportManager;