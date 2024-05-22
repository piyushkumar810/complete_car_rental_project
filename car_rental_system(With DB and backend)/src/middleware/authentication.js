require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");


const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.verify.SECRET_KEY);
    console.log(verifyUser);
    const myUser = await User.findOne({ _id: verifyUser._id });
    // console.log(myUser);
    req.token = token;
    req.myUser = myUser;
    // res.status(201).render("userPage");
    next();
  } catch (error) {
    res.status(401).render("userLogin");
  }
}


// ***************  Sending Mail ***************
const otp = Math.floor(Math.random() * 100000);

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
      to: "suryask07@gmail.com",
      subject: "Testing",
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

  }
}
module.exports = {
  auth, verifyEmail
};
