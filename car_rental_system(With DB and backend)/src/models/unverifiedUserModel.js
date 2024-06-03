require("dotenv").config();
const { capitalize, lowerCase, floor, uniq, uniqueId } = require("lodash");
const mongoose = require("mongoose");



// ***************** Time Conversion **********
function convertISTtoUTC(date) {
  const istOffset = 5.5 * 60; // IST is UTC + 5:30
  const utcDate = new Date(date.getTime() - (istOffset * 60 * 1000));
  return utcDate;
}


const unverifiedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowerCase: true
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
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
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true
  }
})


const unverifiedUser = new mongoose.model("unverifiedUser", unverifiedSchema);

module.exports = unverifiedUser;