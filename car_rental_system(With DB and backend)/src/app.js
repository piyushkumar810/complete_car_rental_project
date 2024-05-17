require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
require("./db/connection");
const User = require("./models/model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/authentication");
const cookieParser = require("cookie-parser");



// ******** Paths *************

// Static path for public directory 
const staticPath = path.join(__dirname, "../public");
// Path for views directory
const viewsPath = path.join(__dirname, "../templates/views");


// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));

// View Engines 
app.set("views", viewsPath);
app.set("view engine", "hbs");


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




// ************************login(get) section route**************************

app.get("/userLogin", (req, res) => {
  res.render("userLogin");
})


// ************************** Registration get Route**************

app.get("/userRegistration", (req, res) => {
  res.render("userRegistration");
})



// ************************login(post) section route**************************

app.post("/userRegistration", async (req, res) => {

  try {
    const EnterPassword = req.body.Create_Password;
    const confirmPassword = req.body.Confirm_Password;
    if (EnterPassword === confirmPassword) {
      const userDocument = new User({
        name: req.body.FullName.trim(),
        contact: req.body.Contact.trim(),
        email: req.body.Email,
        password: confirmPassword
      })
      await userDocument.save().then(() => {
        res.status(201).send("Form Submitted")
      }).catch((error) => {
        res.status(400).send(error);
        console.log(error);
      })
    }
  } catch (error) {
    res.status(400).send("Password MisMatch");
  }

})

// ************************register(post) section route**************************

app.post("/userLogin", (req, res) => {

})


// ****** Forgot Password ************

app.get("/forgetPassword", (req, res) => {
  res.render("forgotPassword");
})

// ****** Forgot Password (POST Method)************
app.post("/forgetPassword", (req, res) => {
  // res.render("forgotPassword");
})



app.listen(port, () => {
  console.log("Listening at port ", port);
})