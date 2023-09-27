require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;
mongoose
  .connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.route("/").get((req, res) => {
  res.render("home");
});

app.route("/login").get((req, res) => {
  res.render("login");
});

app.route("/register").get((req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  bcrypt
    .hash(req.body.password, saltRounds)
    .then((hash) => {
      const newUser = new User({
        email: req.body.username,
        password: hash,
      });
      newUser
        .save()
        .then(() => {
          res.render("secrets");
        })
        .catch(() => {
          console.log("Error saving the data of user");
        });
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/login", (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((foundUser) => {
      bcrypt.compare(password, foundUser.password, function (err, result) {
        if (result === true) {
          res.render("secrets");
        } else {
          console.log(err);
        }
      });
    })
    .catch((error) => {
      res.send("User doesn't exists");
      console.log("error finding the user" + error);
    });
});

app.listen(port, function () {
  console.log("Listening on port 3000");
});
