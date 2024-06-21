const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  name: {
    type: String, 
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
  }
})

const signIn = new mongoose.model("signIn", signupSchema);

module.exports = signIn;