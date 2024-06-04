const nodemailer = require("nodemailer");
const otp = Math.floor(Math.random() * 1000000);



const verifyEmail = () => {
  try {
    const mailSender = nodemailer.createTransport({
      service: "gmail",
      secure: "true",
      port: 465,
      auth: {
        user: "suryask7549@gmail.com",
        pass: "eugb xzqq ebvd fgvw"
      }
    })

    const receiver = {
      from: "suryask7549@gmail.com",
      to: "sauryask07@gmail.com",
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



