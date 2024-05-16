require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
require("./db/connection");
const User = require("./models/models");
const bcrypt = require("bcryptjs");



// ******** Paths *************

// Static path for public directory 
const staticPath = path.join(__dirname, "../public");
// Path for views directory
const viewsPath = path.join(__dirname, "../templates/views");


// Middleware
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

app.get("/collections", (req, res) => {
  res.render("collections");
})




// ************************login(get) section route**************************

app.get("/userLogin", (req, res) => {
  res.render("userLogin");
})


// ************************** Registration Post**************8

app.get("/userRegistration", (req, res) => {
  res.render("userRegistration");
})



// ************************login(post) section route**************************

app.post("/userRegistration", (req, res) => {
  res.render("userRegistration");
})

// ************************register(post) section route**************************

app.post("/userLogin", (req, res) => {

})



app.listen(port, () => {
  console.log("Listening at port ", port);
})

