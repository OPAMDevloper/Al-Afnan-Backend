// otpHelper.js
const nodemailer = require('nodemailer');

// Create a transporter using Ethereal email service
async function createTransporter() {

    console.log('process.env.MAIL_HOST', process.env.MAIL_HOST);
    console.log('process.env.MAIL_PORT', process.env.MAIL_PORT);
    console.log('process.env.SECURE', process.env.SECURE);
    console.log('process.env.USERNAME', process.env.USERNAME);
    console.log('process.env.PASSWORD', process.env.PASSWORD);

    return nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secureConnection: false,
        auth: {
            user: 'marielle.hansen20@ethereal.email',
            pass: process.env.PASSWORD,
        },
        logger: true, // Enable logging
        debug: true,
    });
}

async function sendOtp(email, otp, purpose) {
    const transporter = await createTransporter();

    // Customize the email based on the purpose
    const subject = purpose === 'register' ? 'Verify Your Registration OTP' : 'Password Reset OTP';
    const text = `Your OTP for ${purpose === 'register' ? 'registration' : 'password reset'} is: ${otp}`;
    const html = `<b>Your OTP for ${purpose === 'register' ? 'registration' : 'password reset'} is: ${otp}</b>`;

    // Send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"OTP Service" <${transporter.options.auth.user}>`,
        to: email,
        subject: subject,
        text: text,
        html: html,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

// Export the function for external use
module.exports = { sendOtp };
