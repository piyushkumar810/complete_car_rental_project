const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;


// Static path for public directory 
const staticPath = path.join(__dirname, "../public");
// Path for views directory
const viewsPath = path.join(__dirname, "../templates/views");



app.set("views", viewsPath);
app.set("view engine", "hbs");
app.use(express.static(staticPath));


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

app.get("/login", (req, res) => {
  res.render("login");
})
// ************************login(post) section route**************************

app.post("/login", (req, res) => {
  res.render("login");
})




// ************************register(get) section route**************************

app.get("/register", (req, res) => {
  res.render("register");
})
// ************************register(post) section route**************************

app.post("/register", (req, res) => {
  res.render("register");
})


app.listen(port, () => {
  console.log("Listening at port ", port);
})

