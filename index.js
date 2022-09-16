const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
app.use(express.json());

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

mongoose
  .connect(process.env.dbString, { useNewUrlParser: true })
  .then(() => console.log("MongoDB conected successfully"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log("server running on port", PORT));
