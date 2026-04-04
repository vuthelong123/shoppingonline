const nodemailer = require('nodemailer');
const MyConstants = require('./MyConstants');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: MyConstants.EMAIL_USER,
    pass: MyConstants.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const EmailUtil = {
  send(email, otp) {
    const text = 'Your verification code is: ' + otp;
    return new Promise(function (resolve, reject) {
      const mailOptions = {
        from: MyConstants.EMAIL_USER,
        to: email,
        subject: 'Signup | Verification (OTP)',
        text: text
      };
      transporter.sendMail(mailOptions, function (err, result) {
        if (err) return reject(err);
        resolve(true);
      });
    });
  }
};
module.exports = EmailUtil;