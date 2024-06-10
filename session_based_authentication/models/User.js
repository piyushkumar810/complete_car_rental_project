const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

(async () => {

  try {
    await mongoose.connect("mongodb://localhost:27017/UserDB");
    console.log("Connected Successfully");
    const userSchema = new mongoose.Schema({
      username: {
        type: String
      }
    })
  } catch (error) {
    console.log(error);
  }

})();