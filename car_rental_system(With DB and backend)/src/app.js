// require("dotenv").config();
// const express = require("express");
// const app = express();
// const path = require("path");
// const nodemailer = require("nodemailer");
// const cookieParser = require("cookie-parser");
// const port = process.env.PORT || 8000;
// require("./db/connection");
// const User = require("./models/userModel");
// const Cars = require("./models/carModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const auth = require("./middleware/authentication");
// const emailVerification = require("./middleware/emailVerification");


// // ******** Paths *************

// // Static path for public directory 
// const staticPath = path.join(__dirname, "../public");
// // Path for views directory
// const viewsPath = path.join(__dirname, "../templates/views");


// // Middleware
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(staticPath));

// // View Engines 
// app.set("views", viewsPath);
// app.set("view engine", "hbs");


// // ********************homepage route**********************

// app.get("/home", (req, res) => {
//   res.render("homepage");
// })

// // ********************services route************************

// app.get("/services", auth, (req, res) => {
//   res.render("services");
// })


// // *******************about section route**********************

// app.get("/about", auth, (req, res) => {
//   res.render("about");
// })


// // ************************blog section route**************************

// app.get("/blog", auth, (req, res) => {
//   res.render("blog");
// })


// // ************************collection section route**************************

// app.get("/contact-us", auth, (req, res) => {
//   res.render("contact_us");
// })


// // ************************Admin section route**************************

// app.get("/admin", auth, (req, res) => {
//   res.render("admin");
// })


// // ************************UserPage section route**************************

// app.get("/userPage", auth, (req, res) => {
//   res.render("userPage");
// })




// // ************************login(get) section route**************************

// app.get("/userLogin", auth, (req, res) => {
//   res.render("userLogin");
// })


// // ************************** Registration get Route**************

// app.get("/userRegistration", (req, res) => {
//   res.render("userRegistration");
// })


// // ************************register(post) section route**************************



// app.post("/userRegistration", async (req, res) => {

//   try {
//     const EnterPassword = req.body.Create_Password;
//     const confirmPassword = req.body.Confirm_Password;
//     if (EnterPassword === confirmPassword) {
//       const userDocument = new User({
//         name: req.body.FullName.trim(),
//         contact: req.body.Contact.trim(),
//         email: req.body.Email,
//         password: confirmPassword
//       })

//       // ************* Generating Token *************
//       const token = await userDocument.generateAuthToken();


//       // *********** Sending Email *****************
//       const verify = await userDocument.emailVerification("suryask7549@gmail.com", req.body.Email, process.env.Password);
//       console.log(verify, "Mail Sent Successfully");


//       await userDocument.save();
//       console.log("User Registerd");
//     }
//   } catch (error) {
//     res.status(400).send(error);
//   }

// })



// // ************************login(post) section route**************************
// app.post("/userLogin", async (req, res) => {
//   try {
//     const email = req.body.Email;
//     const password = req.body.Password;
//     const isUser = await User.findOne({ email });
//     // console.log(isUser);
//     const isMatch = await bcrypt.compare(password, isUser.password);
//     // console.log(isMatch);

//     const token = await isUser.generateAuthToken();
//     if (isUser) {
//       if (isMatch) {
//         res.cookie("jwt", token, {
//           expires: new Date(Date.now() + (60 * 60)),
//           httpOnly: true,
//           secure: true
//         })

//         res.status(201).send("User's Profile Page");
//       }
//       else {
//         res.status(401).render("userLogin");
//       }
//     }
//     else {
//       res.send("User Not Found");
//     }

//   } catch (error) {
//     console.log(error);
//   }
// })


// // ****** Forgot Password ************

// app.get("/forgetPassword", auth, (req, res) => {
//   res.render("forgotPassword");
// })

// // ****** Forgot Password (POST Method)************
// app.post("/forgetPassword", (req, res) => {
//   // res.render("forgotPassword");
// })





// // ****************   Car Related Routes ***************




// // ******** Collections  *********
// app.get("/collections", (req, res) => {
//   res.send("collections");
// })



// // **************  Registering New Car ************

// app.get("/makeEntry", (req, res) => {
//   res.send("Car Entry Page")
// });
// app.post("/makeEntry", (req, res) => {

// });




// app.listen(port, () => {
//   console.log("Listening at port ", port);
// })




require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;
require("./db/connection");
const User = require("./models/userModel");
const Cars = require("./models/carModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/authentication");
const emailVerification = require("./middleware/emailVerification");

// Paths
const staticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));

// View Engines
app.set("views", viewsPath);
app.set("view engine", "hbs");

// Routes
app.get("/home", (req, res) => {
  res.render("homepage");
});

app.get("/services", auth, (req, res) => {
  res.render("services");
});

app.get("/about", auth, (req, res) => {
  res.render("about");
});

app.get("/blog", auth, (req, res) => {
  res.render("blog");
});

app.get("/contact-us", auth, (req, res) => {
  res.render("contact_us");
});

app.get("/admin", auth, (req, res) => {
  res.render("admin");
});

app.get("/userPage", auth, (req, res) => {
  res.render("userPage");
});

app.get("/userLogin", (req, res) => {
  res.render("userLogin");
});

app.get("/userRegistration", (req, res) => {
  res.render("userRegistration");
});

app.post("/userRegistration", async (req, res) => {
  try {
    const { FullName, Contact, Email, Create_Password, Confirm_Password } = req.body;

    if (Create_Password !== Confirm_Password) {
      return res.status(400).send("Passwords do not match");
    }

    const userDocument = new User({
      name: FullName,
      contact: Contact,
      email: Email,
      password: Confirm_Password,
    });

    // Generating Token
    const token = await userDocument.generateAuthToken();

    // Sending Email
    try {
      await emailVerification("suryask7549@gmail.com", Email, process.env.Password);
      console.log("Mail Sent Successfully");
    } catch (error) {
      console.log("Email sending failed:", error);
      return res.status(500).send("Email sending failed");
    }

    await userDocument.save();
    res.status(201).send("User Registered");
  } catch (error) {
    res.status(400).send(error);
  }
});


// ************ (get)Mail Verification ********


// app.get("/mailVerification", (req, res) => {
//   res.render("mailVerification");
// })

// ****************  (POST) Mail verification ********

// app.post('/mailVerification'(req,res)=>{

// })


app.post("/userLogin", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const isUser = await User.findOne({ email: Email });

    if (!isUser) {
      return res.status(404).send("User Not Found");
    }

    const isMatch = await bcrypt.compare(Password, isUser.password);
    if (!isMatch) {
      return res.status(401).send("Invalid Credentials");
    }

    const token = await isUser.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3600000), // 1 hour
      httpOnly: true,
      secure: true,
    });

    res.status(200).send("User's Profile Page");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/forgetPassword", auth, (req, res) => {
  res.render("forgotPassword");
});

app.post("/forgetPassword", (req, res) => {
  // Implementation for forgot password
});

app.get("/collections", (req, res) => {
  res.send("collections");
});

app.get("/makeEntry", (req, res) => {
  res.send("Car Entry Page");
});

app.post("/makeEntry", (req, res) => {
  // Implementation for making car entry
});

app.listen(port, () => {
  console.log("Listening at port ", port);
});
