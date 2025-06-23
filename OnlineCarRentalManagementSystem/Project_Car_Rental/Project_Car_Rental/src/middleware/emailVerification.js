const nodemailer = require("nodemailer");

const verifyEmail = (sender, receiver_mail, sender_pass, otp) => {
  try {
    const mailSender = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: 'suryask7549@gmail.com',
        pass: 'ivqo snpi uvgj kbhi'
      }
    });

    const mailOptions = {
      from: sender,
      to: receiver_mail,
      subject: "Testing",
      text: `${otp} Please verify`
    };

    mailSender.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent successfully:");
      }
    });
  } catch (error) {
    console.log("Unexpected error:", error);
  }
};

module.exports = verifyEmail;




