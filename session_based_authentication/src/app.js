const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const morgan = require("morgan");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const User = require("./models/User");


// Setting Paths
const viewPath = path.join(__dirname, "../templates/views");
const staticPath = path.join(__dirname, "../public");


app.set("views", viewPath);
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    key: 'user_sid',
    secret: 'secretkeyforthesessionbasedauthentication',
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 600000,
      secure: true,
      httpOnly: true,
      sameSite: 'strict'
    }
  })
)

app.use((req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/dashboard')
  }
  next();
})


const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookie.user_sid) {
    res.redirect('/dashboard');
  }
  else {
    next();
  }
}


app.route('/login').
  get(sessionChecker, (req, res) => {
    res.render("login");
  })
  .post(async (req, res) => {

  })


app.route('/signup').
  get(sessionChecker, (req, res) => {
    res.render("signup");
  })
  .post(async (req, res) => {
    const user = new User({
      username: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    await user.save().then(() => {
      res.redirect("/dashboard");
    }).catch((err) => {
      console.log(err);
    })
  })

app.get('/dashboard', sessionChecker, (req, res) => {
  res.render("dashboard");

})

app.listen(8000, () => {
  console.log("Listening at Port 8000");
})