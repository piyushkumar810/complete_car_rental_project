require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/model");


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
module.exports = auth;
