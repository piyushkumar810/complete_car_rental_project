require("dotenv").config();
const validator = require("validator");
const mongoose = require("mongoose");



// ***************** Time Conversion **********
function convertISTtoUTC(date) {
  const istOffset = 5.5 * 60; // IST is UTC + 5:30
  const utcDate = new Date(date.getTime() - (istOffset * 60 * 1000));
  return utcDate;
}


const verifiedSchema = new mongoose.Schema({
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
  // tempOTP:{
  // type:Number,
  // expiry
  // },
  isVerified: {
    type: Boolean,
    default: false,
    required: true
  }
})

// ************* generating Token *********************

verifiedSchema.methods.generateAuthToken = async function () {
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

verifiedSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

const verifiedUser = new mongoose.model("verifiedUser", verifiedSchema);

module.exports = verifiedUser;