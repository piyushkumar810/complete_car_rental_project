require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { date } = require("faker/lib/locales/az");
(async function () {


  // ***************** Time Conversion **********
  function convertISTtoUTC(date) {
    const istOffset = 5.5 * 60; // IST is UTC + 5:30
    const utcDate = new Date(date.getTime() - (istOffset * 60 * 1000));
    return utcDate;
  }


  const registrationSchema = new mongoose.Schema({
    name: {
      type: String,
      lowerCase: true,
      trim: true,
      required: true
    },
    contact: {
      type: Number,
      length: 10,
      trim: true,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    time: {
      type: Date,
      default: function () {
        // Get current date and time in IST
        const currentDateIST = new Date();
        // Convert to UTC
        return convertISTtoUTC(currentDateIST);
      }
    },
    isVerified: {
      type: Boolean,
      required: true
    },
    otp: {
      type: Number,
    },
    otpExpires: {
      type: Date, // Added field to store OTP expiration time
    }
  });




  // ******************** Applying Hashing ******************

  registrationSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });



  // Comparing Password
  registrationSchema.methods.comparePassword = function (plaintext, callback) {
    bcrypt.compare(plaintext, this.password, (err, isMatch) => {
      if (err) return callback(err);
      callback(null, isMatch);
    });
  };

  const User = new mongoose.model("User", registrationSchema);

  module.exports = User;
})();