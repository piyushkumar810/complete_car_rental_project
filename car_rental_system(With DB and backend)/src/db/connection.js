require("dotenv").config();
const mongoose = require("mongoose");
(async function () {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connection Successful ");
  } catch (error) {
    console.log(" Failed to connect ", error);
  }
  const UsersSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    contact: {
      type: Number,
      required: true,
      length: 10
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
    ulternateMOB: {
      type: Number,
      length: 10
    },
    ulternateEmail: {
      type: email,
      unique: true
    },
  })

  // Applying Hashing  


  const UsersModel = new mongoose.model("UsersModel", UsersSchema);
})();