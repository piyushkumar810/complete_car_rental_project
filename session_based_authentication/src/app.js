const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const User = require("./models/User");

const app = express();

// Setting Paths
const viewPath = path.join(__dirname, "../templates/views");
const staticPath = path.join(__dirname, "../public");

app.set("views", viewPath);
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
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
  if (req.session.user && req.cookies.user_sid) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Middleware to prevent logged-in users from accessing login/signup pages
const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

// Routes
app.route("/login")
  .get(sessionChecker, (req, res) => {
    res.render("login");
  })
  .post(async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        res.redirect("/login");
      } else {
        user.comparePassword(password, (err, isMatch) => {
          if (err || !isMatch) {
            res.redirect("/login");
          } else {
            req.session.user = user;
            res.redirect("/dashboard");
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.redirect("/login");
    }
  });

app.route("/signup")
  .get(sessionChecker, (req, res) => {
    res.render("signup");
  })
  .post(async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });

    try {
      await user.save();
      req.session.user = user;
      res.redirect("/dashboard");
    } catch (error) {
      console.error(error);
      res.redirect("/signup");
    }
  });

app.get("/dashboard", requireLogin, (req, res) => {
  res.render("dashboard");
});

app.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/login");
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(8000, () => {
  console.log("Listening at Port 8000");
});
