const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

(async () => {

  try {
    await mongoose.connect("mongodb://localhost:27017/UserDB");
    console.log("Connected Successfully");

  } catch (error) {
    console.log(error);
  }

})();



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})


// Hashing 

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hash(this.password, 10);
})


// Compare function

userSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compare(plaintext, this.password))
}

// Model

const userModel = new mongoose.model("userModel", userSchema);



module.exports = userModel;