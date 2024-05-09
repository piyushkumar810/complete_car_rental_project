const mongoose = require("mongoose");

(async function () {
  const registrationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    contact: {
      type: Number,
      length: 10,
      required: true
    },
    email: {
      type: email,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    alternateEmail: {
      type: email,
      unique: true
    },
    alternateContact: {
      type: Number,
    }
  });

  const User = new mongoose.model("User", registrationSchema);

  module.exports = User;
})();