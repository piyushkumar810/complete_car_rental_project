require("dotenv").config();
const mongoose = require("mongoose");
(async function () {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connection Successful ");
  } catch (error) {
    console.log(" Failed to connect ", error);
  }
  // const UsersSchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     required: true
  //   }
  // })

  // const UsersModel = new mongoose.model("UsersModel", UsersSchema);


  // const document_1 = new UsersModel({
  //   name: "Surya"
  // })

  // await document_1.save().then(() => {
  //   console.log("Saved");
  // }).catch((error) => {
  //   console.log(" Saving Failed due to ", error);
  // });
})();