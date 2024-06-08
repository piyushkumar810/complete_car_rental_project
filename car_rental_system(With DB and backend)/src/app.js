require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
require("./db/connection");
const User = require("./models/UserModel");
const hbs = require("hbs");
const Cars = require("./models/carModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/authentication");
const verifyEmail = require("./middleware/emailVerification");


// ******** Paths *************

// Static path for public directory 
const staticPath = path.join(__dirname, "../public");
// Path for views directory
const viewsPath = path.join(__dirname, "../templates/views");
// Path for Partials
const partialPath = path.join(__dirname, "../templates/partials");

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));

// View Engines 
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);


// ********************homepage route**********************

app.get("/home", (req, res) => {
  res.render("homepage");
})

// ********************services route************************

app.get("/services", (req, res) => {
  res.render("services");
})


// *******************about section route**********************

app.get("/about", (req, res) => {
  res.render("about");
})


// ************************blog section route**************************

app.get("/blog", (req, res) => {
  res.render("blog");
})


// ************************collection section route**************************

app.get("/contact-us", (req, res) => {
  res.render("contact_us");
})


// ************************Admin section route**************************

app.get("/admin", auth, (req, res) => {
  res.render("admin");
})


// ************************UserPage section route**************************

app.get("/userPage", auth, (req, res) => {
  res.render("userPage");
})




// ************************login(get) section route**************************

app.get("/userLogin", (req, res) => {
  res.render("userLogin");
})


// ************************** Registration get Route**************

app.get("/userRegistration", (req, res) => {
  res.render("userRegistration");
})


// ************************register(post) section route**************************



app.post("/userRegistration", async (req, res) => {

  const generateOTP = () => {
    return Math.floor(Math.random() * 100000);
  };

  const OTP = generateOTP();
  try {
    const EnterPassword = req.body.Create_Password;
    const confirmPassword = req.body.Confirm_Password;
    const receiver = req.body.Email;
    if (EnterPassword === confirmPassword) {
      const userDocument = new User({
        name: req.body.FullName,
        contact: req.body.Contact,
        email: receiver,
        password: confirmPassword,
        isVerified: false,
        otp: OTP
      })



      // ************* Generating Token *************
      const token = await userDocument.generateAuthToken();


      // *********** Sending Email *****************
      verifyEmail("suryask7549@gmail.com", receiver, process.env.Password, OTP);
      console.log("Mail Sent Successfully");
      // res.render("mailVerification");
      res.render("mailVerification");
      await userDocument.save();
      console.log("User Registerd");
    }
  } catch (error) {
    res.status(400).send(error);
  }

})

// *****************  OTP Verification *************

app.get("/mailverification", (req, res) => {
  res.render("mailVerification");
})



app.post("/mailverification", async (req, res) => {
  try {
    const verifyEmail = req.body.verifyingEmail;
    const verifyOTP = req.body.otp;

    // Checking if user exists
    // console.log("user");
    const isUser = await User.findOne({ email: verifyEmail });
    console.log(isUser);
    if (isUser) {

      if (verifyOTP == isUser.otp) {
        await User.updateOne({ email: verifyEmail }, {
          $set: {
            isVerified: true
          }
        })
        res.render("registered_Successfullly");
      }
    }

  } catch (error) {
    console.log(error);
  }
})
// ************************login(post) section route**************************
app.post("/userLogin", async (req, res) => {
  try {
    const email = req.body.Email;
    const password = req.body.Password;
    console.log(password);
    const isUser = await User.findOne({ email });
    // console.log(isUser);
    // console.log(isMatch);
    if (isUser) {
      const isMatch = await bcrypt.compare(password, isUser.password);
      if (isMatch) {
        if (isUser.isVerified === true) {
          const token = await isUser.generateAuthToken();
          res.cookie("jwt", token, {
            expires: new Date(Date.now() + (60 * 60)),
            httpOnly: true,
            secure: true
          })
          res.status(201).render("logged_In_Successfully");
        }
        else {
          res.render("mailVerification");
        }
      }
      else {
        res.status(500).render("incorrect_Password");
      }
    }
    else {
      res.status(401).render("Email_Not_Found");
    }

  } catch (error) {
    console.log(error);
  }
})


// ****** Forgot Password ************

app.get("/forgetPassword", auth, (req, res) => {
  res.render("forgotPassword");
})

// ****** Forgot Password (POST Method)************
app.post("/forgetPassword", (req, res) => {
  // res.render("forgotPassword");
})





// ****************   Car Related Routes ***************




// ******** Collections  *********
app.get("/collections", (req, res) => {
  res.send("collections");
})



// **************  Registering New Car ************

app.get("/makeEntry", (req, res) => {
  res.send("Car Entry Page")
});
app.post("/makeEntry", (req, res) => {

});


// **************** Page Not Found ***************

app.get("*", (req, res) => {
  res.render("404_error_page_not_found");
})



app.listen(port, () => {
  console.log("Listening at port ", port);
})



