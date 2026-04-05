const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const EmailUtil = {
  async send(email, otp) {
    try {
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        // IMPORTANT: Because you are using the testing domain 'onboarding@resend.dev', 
        // you MUST send to the email address you registered your Resend account with.
        to: email,
        subject: 'Signup | Verification (OTP)',
        text: 'Your verification code is: ' + otp
      });

      if (error) {
        console.error('Resend Error:', error);
        throw error; // Throw to be caught by the caller
      }

      return true; // Return true on success
    } catch (err) {
      console.error('Exception in EmailUtil.send:', err);
      throw err;
    }
  }
};

module.exports = EmailUtil;