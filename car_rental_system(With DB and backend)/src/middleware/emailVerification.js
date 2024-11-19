const nodemailer = require("nodemailer");
const verifyEmail = (sender, receiver_mail, sender_pass, otp) => {
  try {
    const mailSender = nodemailer.createTransport({
      service: "gmail",
      secure: "true",
      port: 465,
      auth: {
        user: "surya_mail",
        pass: "llrh mikb vezq igri"
      }
    })

    const receiver = {
      from: sender,
      to: receiver_mail,
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



