const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
require("./db/conn");
const User = require("./models/signUp");
const viewPath = path.join(__dirname, "../templates/views");
const staticPath = path.join(__dirname, "../public");

app.use(express.static(staticPath));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));


app.set("views", viewPath);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  // res.send("Hello From Homepage");
  res.render("registration_and_login");
})

app.get("/login", (req, res) => {
  res.render("registration_and_login");
})

app.post("/login", async (req, res) => {
  const email = req.body.email;

  const isUser = await User.findOne({ email });
  if (isUser) {
    if (isUser.password === req.body.password) {
      res.send("LoggedIn")
    }
    else {
      res.send("Incorrect Password");
    }
  }
  else {
    res.redirect("registration_and_login")
  }
})



app.get("/signup", (req, res) => {
  res.render("registration_and_login");
})
app.post("/signup", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    await user.save();
    res.send("Registered")
    console.log("User Registered");
  } catch (error) {
    console.log(error);
  }
})


app.listen(port, () => {
  console.log("Server is listening at port ", port);
})