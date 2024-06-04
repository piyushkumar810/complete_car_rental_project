// const nodemailer = require("nodemailer");
// // ***************  Sending Mail ***************
// const otp = Math.floor(Math.random() * 100000);

// const verifyEmail = (sender_mail, reciver_mail, sender_pass) => {
//   try {
//     const mailSender = nodemailer.createTransport({
//       service: "gmail",
//       secure: "true",
//       port: 465,
//       auth: {
//         user: `${sender_mail}`,
//         pass: `${sender_pass}`
//       }
//     })

//     const receiver = {
//       from: `${sender_mail}`,
//       to: `${reciver_mail}`,
//       subject: "OTP Verification",
//       text: `${otp}`
//     }


//     mailSender.sendMail(receiver, (error, emailResponse) => {

//       if (error) {
//         console.log(error);
//       }
//       else {
//         console.log("success", emailResponse);
//       }
//       response.end();
//     })
//   } catch (error) {
//     console.log(error);
//   }
// }

// module.exports = verifyEmail;







const nodemailer = require("nodemailer");


const verifyEmail = async (sender_mail, receiver_mail, sender_pass, otp) => {
  // const otp = generateOTP();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: sender_mail,
      pass: sender_pass,
    },
  });

  const mailOptions = {
    from: sender_mail,
    to: receiver_mail,
    subject: "OTP Verification",
    text: `Your OTP is: ${otp}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = verifyEmail;
