const sgMail = require('@sendgrid/mail');

const sendEmail = async (req, res, next) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'admin@designmyphoto.com', // Change to your recipient
      from: 'mrdalegrant@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    const info = await sgMail.send(msg);
    return res.json(info);
  } catch (error) {
    console.log(error)
    return next(error);
  }
};

module.exports = sendEmail;
