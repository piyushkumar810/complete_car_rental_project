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
    tokens: [{
      token: {
        type: String,
        required: true
      }
    }],
    time: {
      type: Date,
      default: function () {
        // Get current date and time in IST
        const currentDateIST = new Date();
        // Convert to UTC
        return convertISTtoUTC(currentDateIST);
      }
    }
  });

  // ************* generating Token *********************

  registrationSchema.methods.generateAuthToken = async function () {
    try {
      const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
      this.tokens = this.tokens.concat({ token });
      return token;
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }


  // ******************** Applying Hashing ******************

  registrationSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  })


  const User = new mongoose.model("User", registrationSchema);

  module.exports = User;
})();