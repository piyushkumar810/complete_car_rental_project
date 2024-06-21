const mongoose = require("mongoose");

(async () => {


  await mongoose.connect("mongodb://localhost:27017/SamePageLogInSignUp");
  console.log("Connection Successful");

})();

// module.exports=