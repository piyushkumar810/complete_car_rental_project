// const nodemailer = require("nodemailer");
// const verifyEmail = (sender, receiver_mail, sender_pass, otp) => {
//   try {
//     const mailSender = nodemailer.createTransport({
//       service: "gmail",
//       secure: "true",
//       port: 465,
//       auth: {
//         user: "surya_mail",
//         pass: "ivqo snpi uvgj kbhi"
//       }
//     })

//     const receiver = {
//       from: sender,
//       to: receiver_mail,
//       subject: "Testing",
//       text: `${otp} Please verify`
//     }


//     mailSender.sendMail(receiver, (error, emailResponse) => {

//       if (error) {
//         console.log(error);
//       }
//       else {
//         console.log("success", emailResponse);
//       }
//       emailResponse.end();
//     })
//   } catch (error) {
//     console.log(error);
//   }
// }

// module.exports = verifyEmail;

// // verifyEmail();





const nodemailer = require("nodemailer");

const verifyEmail = (sender, receiver_mail, sender_pass, otp) => {
  try {
    const mailSender = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: 'suryask7549@gmail.com',       // ✅ should be full Gmail address
        pass: 'ivqo snpi uvgj kbhi'   // ✅ should be app password
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
