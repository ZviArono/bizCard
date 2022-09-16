const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const { engine } = require("express-handlebars");
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// הוספת מנוע חדש לאפליקציה מסוג הנדלברס
app.engine("handlebars", engine());
// שיוך המנוע שהוספנו לאפליקציה
app.set("view engine", "handlebars");
// הגדרת הקבצים שאחראים על התצוגות המתחלפות
app.set("views", "./views");

// require routes
const login = require("./routes/login");
const register = require("./routes/register");
const profile = require("./routes/profile");
const cards = require("./routes/cards");
const myCards = require("./routes/myCards");

app.use("/api/login", login);
app.use("/api/register", register);
app.use("/api/profile", profile);
app.use("/api/cards", cards);
app.use("/api/myCards", myCards);
app.use(cors());

// client side
app.get("/", (req, res) => {
  res.redirect("register");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/home", (req, res) => {
  res.redirect("login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/cards", (req, res) => {
  res.render("cards");
});

app.get("/myCards", (req, res) => {
  res.render("myCards");
});

app.get("*", (req, res) => {
  res.render("pnf");
});

mongoose
  .connect(process.env.dbString, { useNewUrlParser: true })
  .then(() => console.log("MongoDB conected successfully"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log("server running on port", PORT));
