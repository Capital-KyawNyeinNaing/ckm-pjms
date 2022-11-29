const nodemailer = require('nodemailer');

const sendEmail = async (option) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: 'tonywynn.dev@gmail.com',
      pass: 'gjhpldfyongobajn',
    },
  });

  const emails = option.emails;

  emails.forEach(async (email) => {
    let info = await transporter.sendMail({
      from: 'thetpai.tp27@gmail.com',
      to: email,
      subject: option.subject,
      text: option.message,
    });

    console.log('Message sent: %s', info.messageId);
  });
};

module.exports = sendEmail;
