// require("dotenv").config();
// const express = require("express");
// const app = express();
// const path = require("path");
// const nodemailer = require("nodemailer");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const port = process.env.PORT || 3000;
// require("./db/connection");
// const User = require("./models/UserModel");
// const hbs = require("hbs");
// const Cars = require("./models/carModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const auth = require("./middleware/authentication");
// const verifyEmail = require("./middleware/emailVerification");
// const session = require("express-session");


// // ******** Paths *************

// // Static path for public directory 
// const staticPath = path.join(__dirname, "../public");
// // Path for views directory
// const viewsPath = path.join(__dirname, "../templates/views");
// // Path for Partials
// const partialPath = path.join(__dirname, "../templates/partials");

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(staticPath));



// // Sessions
// app.use(
//   session({
//     key: "user_session_id",
//     secret: "secretkeyforthesessionbasedauthentication",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 3 * 24 * 60 * 60 * 1000, // 3 Days
//       secure: false,
//       httpOnly: true,
//       sameSite: "strict",
//     },
//   })
// );


// // Middleware to check if user is logged in for protected routes
// const requireLogin = (req, res, next) => {
//   if (req.session.user && req.cookies.user_session_id) {
//     next();
//   } else {
//     res.redirect("/userlogin");
//   }
// };


// // Middleware to prevent logged-in users from accessing login/signup pages
// const sessionChecker = (req, res, next) => {
//   if (req.session.user && req.cookies.user_session_id) {
//     res.redirect("/userPage");
//   } else {
//     next();
//   }
// };


// // View Engines 
// app.set("views", viewsPath);
// app.set("view engine", "hbs");
// hbs.registerPartials(partialPath);


// // ********************homepage route**********************

// app.get("/home", (req, res) => {
//   res.render("homepage");
// })

// // ********************services route************************

// app.get("/services", (req, res) => {
//   res.render("services");
// })


// // *******************about section route**********************

// app.get("/about", (req, res) => {
//   res.render("about");
// })


// // ************************blog section route**************************

// app.get("/blog", (req, res) => {
//   res.render("blog");
// })


// // ************************collection section route**************************

// app.get("/contact-us", (req, res) => {
//   res.render("contact_us");
// })


// // ************************UserPage section route**************************

// app.get("/userPage", requireLogin, (req, res) => {
//   res.render("userPage");
// })



// // ************************** Registration get Route**************

// app.get("/userRegistration", sessionChecker, (req, res) => {
//   res.render("userRegistration");
// })


// // ************************register(post) section route**************************



// app.post("/userRegistration", async (req, res) => {

//   const generateOTP = () => {
//     return Math.floor(Math.random() * 100000);
//   };

//   const OTP = generateOTP();
//   try {
//     const EnterPassword = req.body.Create_Password;
//     const confirmPassword = req.body.Confirm_Password;
//     const receiver = req.body.Email;
//     if (EnterPassword === confirmPassword) {
//       const userDocument = new User({
//         name: req.body.FullName,
//         contact: req.body.Contact,
//         email: receiver,
//         password: confirmPassword,
//         isVerified: false,
//         otp: OTP
//       })


//       // *********** Sending Email *****************
//       verifyEmail("suryask7549@gmail.com", receiver, process.env.Password, OTP);
//       console.log("Mail Sent Successfully");
//       // res.render("mailVerification");
//       res.render("mailVerification");
//       await userDocument.save();
//       console.log("User Registerd");
//     }
//   } catch (error) {
//     res.status(400).send(error);
//   }

// })

// // *****************  OTP Verification *************

// app.get("/mailverification", sessionChecker, (req, res) => {
//   res.render("mailVerification");
// })



// app.post("/mailverification", async (req, res) => {
//   try {
//     const verifyEmail = req.body.verifyingEmail;
//     const verifyOTP = req.body.otp;

//     // Checking if user exists
//     // console.log("user");
//     const isUser = await User.findOne({ email: verifyEmail });
//     console.log(isUser);
//     if (isUser) {

//       if (verifyOTP == isUser.otp) {
//         await User.updateOne({ email: verifyEmail }, {
//           $set: {
//             isVerified: true
//           }
//         })
//         res.render("registered_Successfullly");
//       }
//     }

//   } catch (error) {
//     console.log(error);
//   }
// })


// // ************************login(get) section route**************************

// app.get("/userLogin", sessionChecker, (req, res) => {
//   res.render("userLogin");
// })



// // ************************login(post) section route**************************
// app.post("/userLogin", async (req, res) => {
//   try {
//     const email = req.body.Email;
//     // console.log(email);
//     const password = req.body.Password;
//     console.log(password);
//     const isUser = await User.findOne({ email });
//     console.log(isUser);
//     const isMatch = await bcrypt.compare(password, isUser.password);
//     if (isUser) {
//       if (isMatch) {
//         if (isUser.isVerified === true) {
//           req.session.user = isUser;
//           res.status(201).render("logged_In_Successfully");
//         }
//         else {
//           res.render("mailVerification");
//         }
//       }
//       else {
//         res.status(500).render("incorrect_Password");
//       }
//     }
//     else {
//       res.status(401).render("Email_Not_Found");
//     }

//   } catch (error) {
//     console.log(error);
//   }
// })




// // ****** Forgot Password ************

// app.get("/forgetPassword", sessionChecker, (req, res) => {
//   res.render("forgotPassword");
// })

// // ****** Forgot Password (POST Method)************
// app.post("/forgetPassword", (req, res) => {
//   // res.render("forgotPassword");
// })




// // ****** logout ************
// app.get("/logout", sessionChecker, async (req, res) => {
//   if (req.session.user && req.cookies.user_session_id) {
//     res.clearCookie("user_sid");
//     req.session.destroy((err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.redirect("/userlogin");
//       }
//     });
//   } else {
//     res.redirect("/userlogin");
//   }
// })







// // ****************   Car Related Routes ***************


// // ************************Admin section route**************************

// app.get("/admin", (req, res) => {
//   res.render("admin");
// })



// // ******** Collections  *********
// app.get("/collections", sessionChecker, (req, res) => {
//   res.send("collections");
// })



// // **************  Registering New Car ************

// app.get("/makeEntry", (req, res) => {
//   res.send("Car Entry Page")
// });
// app.post("/makeEntry", (req, res) => {

// });


// // **************** Page Not Found ***************

// app.get("*", (req, res) => {
//   res.render("404_error_page_not_found");
// })



// app.listen(port, () => {
//   console.log("Listening at port ", port);
// })



















// ******************************************************************************************************************

require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
require("./db/connection");
const User = require("./models/UserModel");
const hbs = require("hbs");
const Cars = require("./models/carModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/authentication");
const verifyEmail = require("./middleware/emailVerification");
const session = require("express-session");

// ******** Paths *************

// Static path for public directory 
const staticPath = path.join(__dirname, "../public");
// Path for views directory
const viewsPath = path.join(__dirname, "../templates/views");
// Path for Partials
const partialPath = path.join(__dirname, "../templates/partials");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));

// Sessions
app.use(
  session({
    key: "user_session_id",
    secret: "secretkeyforthesessionbasedauthentication",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 3 * 24 * 60 * 60 * 1000, // 3 Days
      secure: false,
      httpOnly: true,
      sameSite: "strict",
    },
  })
);

// Middleware to check if user is logged in for protected routes
const requireLogin = (req, res, next) => {
  if (req.session.user && req.cookies.user_session_id) {
    next();
  } else {
    res.redirect("/userlogin");
  }
};

// Middleware to prevent logged-in users from accessing login/signup pages
const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_session_id) {
    res.redirect("/userPage");
  } else {
    next();
  }
};

// View Engines 
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

// ********************homepage route**********************

app.get("/home", (req, res) => {
  res.render("homepage");
})


// *******************about section route**********************

app.get("/about", (req, res) => {
  res.render("about");
})

// ********************services route************************

app.get("/services", (req, res) => {
  res.render("services");
})

// ************************blog section route**************************

app.get("/blog", (req, res) => {
  res.render("blog");
})

// ************************collection section route**************************

app.get("/contact-us", (req, res) => {
  res.render("contact_us");
})

// ************************** Registration get Route**************

app.get("/userRegistration", sessionChecker, (req, res) => {
  res.render("userRegistration");
})

// ************************register(post) section route**************************

app.post("/userRegistration", async (req, res) => {
  const generateOTP = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const OTP = generateOTP();
  const otpExpires = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes from now

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
        otp: OTP,
        otpExpires: otpExpires // Set OTP expiration time
      });

      // *********** Sending Email *****************
      verifyEmail("suryask7549@gmail.com", receiver, process.env.Password, OTP);
      console.log("Mail Sent Successfully");
      await userDocument.save();
      res.redirect("mailVerification");
      console.log("User Registered");
    } else {
      res.status(400).send("Passwords do not match.");
    }
  } catch (error) {
    res.status(400).send(error);
  }
})

// *****************  OTP Verification *************

app.get("/mailverification", sessionChecker, (req, res) => {
  res.render("mailVerification");
})

app.post("/mailverification", async (req, res) => {
  try {
    const verifyEmail = req.body.verifyingEmail;
    const verifyOTP = req.body.otp;

    // Checking if user exists
    const isUser = await User.findOne({ email: verifyEmail });
    if (isUser) {
      const currentTime = new Date();
      if (currentTime < isUser.otpExpires && verifyOTP == isUser.otp) {
        await User.updateOne({ email: verifyEmail }, {
          $set: {
            isVerified: true
          }
        });
        res.render("registered_Successfullly");
      } else if (currentTime >= isUser.otpExpires) {
        res.status(400).send("OTP has expired. Please request a new one.");
      } else {
        res.status(400).send("Invalid OTP. Please try again.");
      }
    } else {
      res.status(400).send("User not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
})


// ******************* sendEmail ****************************

app.get("/sendEmail", (req, res) => {
  res.render("sendEmail")
});

app.post("/sendEmail", async (req, res) => {
  try {
    const email = req.body.email;
    console.log(email);
    const isRegistered = await User.findOne({ email });
    console.log(isRegistered);
    if (isRegistered) {
      if (!isRegistered.isVerified) {
        const generateOTP = () => {
          return Math.floor(Math.random() * 900000);
        };
        const OTP = generateOTP();
        const otpExpires = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes from now
        await verifyEmail("suryask7549@gmail.com", email, process.env.Password, OTP);
        console.log("Mail Sent");
        await User.updateOne({ email }, {
          $set: {
            otp: OTP,
            otpExpires: otpExpires
          }
        })
        console.log("Fields Updated");
        res.redirect("/mailverification");
      }
      else {
        console.log("User Already Verified ");
        res.redirect("/userLogin");

      }
    }
    else {
      // res.send("User Not Registered");
      console.log("User Not Registered");
      res.redirect("/userRegistration");
    }
  } catch (error) {
    console.log(error);
  }
})


// ************************login(get) section route**************************

app.get("/userLogin", sessionChecker, (req, res) => {
  res.render("userLogin");
})

// ************************login(post) section route**************************

app.post("/userLogin", async (req, res) => {
  try {
    const email = req.body.Email;
    const password = req.body.Password;
    const isUser = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, isUser.password);
    if (isUser) {
      if (isMatch) {
        if (isUser.isVerified === true) {
          req.session.user = isUser;
          res.status(201).render("logged_In_Successfully");
        } else {
          res.render("mailVerification");
        }
      } else {
        res.status(500).render("incorrect_Password");
      }
    } else {
      res.status(401).render("Email_Not_Found");
    }
  } catch (error) {
    console.log(error);
  }
})



// ************************UserPage section route**************************

app.get("/userPage", requireLogin, (req, res) => {
  res.render("userPage");
})




// ****** Forgot Password ************

app.get("/forgetPassword", sessionChecker, (req, res) => {
  res.render("forgotPassword");
})

// ****** Forgot Password (POST Method)************
app.post("/forgetPassword", async (req, res) => {
  try {

    const { email, password } = req.body;
    const isUser = await User.findOne({ email });
    if (isUser) {
      const isPasswordMatch = await bcrypt.compare(password, isUser.password);
      if (isPasswordMatch) {
        res.redirect("/changePassword");
      }
    }

  } catch (error) {
    console.log(error);
  }
})

// ********************** Change Password *****************

app.get("/changePassword", (req, res) => {
  res.render("changePassword");
})

app.patch("/changePassword", async (req, res) => {
  try {

    const { createPassword, confirmPassword } = req.body;

    if (createPassword === confirmPassword) {

    }

  } catch (error) {

  }
})




// ****** logout ************
app.get("/logout", sessionChecker, async (req, res) => {
  if (req.session.user && req.cookies.user_session_id) {
    res.clearCookie("user_sid");
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/userlogin");
      }
    });
  } else {
    res.redirect("/userlogin");
  }
})





// ****************   Car Related Routes ***************

// ************************Admin section route**************************

app.get("/admin", (req, res) => {
  res.render("admin");
})

// ******** Collections  *********
app.get("/collections", sessionChecker, (req, res) => {
  res.send("collections");
})

// **************  Registering New Car ************

app.get("/makeEntry", (req, res) => {
  res.send("Car Entry Page")
});
app.post("/makeEntry", (req, res) => {
  // Register new car logic
});

// **************** Page Not Found ***************

app.get("*", (req, res) => {
  res.render("404_error_page_not_found");
})

app.listen(port, () => {
  console.log("Listening at port ", port);
})





