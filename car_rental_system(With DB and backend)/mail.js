const nodemailer = require("nodemailer");
const otp = Math.floor(Math.random() * 1000000);



const verifyEmail = () => {
  try {
    const mailSender = nodemailer.createTransport({
      service: "gmail",
      secure: "true",
      port: 465,
      auth: {
        user: "senderEmailhere",
        pass: "password created in mail App"
      }
    })

    const receiver = {
      from: "sendermailhere",
      to: "receivermail",
      subject: "Testing",
      text: `${otp} Please verify`
    }


    mailSender.sendMail(receiver, (error, emailResponse) => {

      if (error) {
        console.log(error);
      }
      else {
        console.log("success", emailResponse);
      }
      emailResponse.end();
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = verifyEmail;

// verifyEmail();



