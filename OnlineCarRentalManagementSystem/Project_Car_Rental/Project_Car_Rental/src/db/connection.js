require("dotenv").config();
const mongoose = require("mongoose");
(async function () {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connection Successful ");
  } catch (error) {
    console.log(" Failed to connect ", error);
  }

})();