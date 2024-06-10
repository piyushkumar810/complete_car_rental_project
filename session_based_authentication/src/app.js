const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser);
app.use(
  session({
    key: 'user_sid',
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 600000
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
    res.redirect('/dashbord');
  }
  else {
    next();
  }
}

app.get('/', sessionChecker, (req, res) => {
  res.redirect('/login');
})

app.route('/login').
  get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
  })


app.route('/signup').
  get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + "/public/signup.html");
  })

app.listen(8000, () => {
  console.log("Listening at Port 3000");
})