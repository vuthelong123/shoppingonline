const axios = require('axios');

const EmailUtil = {
  async send(email, otp) {
    try {
      const payload = {
        sender: {
          name: 'ShopOnline',
          email: 'vuthelong1009@gmail.com'
        },
        to: [
          {
            email: email
          }
        ],
        subject: 'Signup | Verification (OTP)',
        textContent: 'Your verification code is: ' + otp
      };

      const config = {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json'
        }
      };

      await axios.post('https://api.brevo.com/v3/smtp/email', payload, config);
      return true;
    } catch (err) {
      console.error(err.response?.data || err.message);
      throw err;
    }
  }
};

module.exports = EmailUtil;