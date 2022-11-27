const nodemailer = require('nodemailer');

const sendEmail = async (emailOptions, smtpOptions) => {
  let transporter = nodemailer.createTransport({
    host: smtpOptions.host,
    port: smtpOptions.port,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: smtpOptions.email,
      pass: smtpOptions.password,
    },
  });

  const recipients = emailOptions.recipients;

  recipients.forEach(async (recipient) => {
    let info = await transporter.sendMail({
      from: smtpOptions.name,
      to: recipient,
      subject: emailOptions.subject,
      text: emailOptions.message,
    });

    console.log('Message sent: %s', info.messageId);
  });
};

module.exports = sendEmail;
