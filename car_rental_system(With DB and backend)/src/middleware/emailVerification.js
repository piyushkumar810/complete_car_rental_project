const nodemailer = require("nodemailer");
// ***************  Sending Mail ***************
const otp = Math.floor(Math.random() * 100000);

const verifyEmail = (sender_mail, reciver_mail, sender_pass) => {
  try {
    const mailSender = nodemailer.createTransport({
      service: "gmail",
      secure: "true",
      port: 465,
      auth: {
        user: `${sender_mail}`,
        pass: `${sender_pass}`
      }
    })

    const receiver = {
      from: `${sender_mail}`,
      to: `${reciver_mail}`,
      subject: "OTP Verification",
      text: `${otp}`
    }


    mailSender.sendMail(receiver, (error, emailResponse) => {

      if (error) {
        console.log(error);
      }
      else {
        console.log("success", emailResponse);
      }
      response.end();
    })
  } catch (error) {
    console.log(error);
  }
}


module.exports = verifyEmail;