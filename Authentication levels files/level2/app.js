const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { stringify } = require("querystring");
var encrypt = require("mongoose-encryption");
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

const secret = "lolodial";
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

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
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });
  newUser
    .save()
    .then(() => {
      res.render("secrets");
    })
    .catch(() => {
      console.log("Error saving the data of user");
    });
});

app.post("/login", (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((foundUser) => {
      if (foundUser.password === password) {
        console.log(foundUser.password);
        res.render("secrets");
      } else {
        res.send("There was error finding the error");
      }
    })
    .catch((error) => {
      res.send("User doesn't exists");
      console.log("error finding the user" + error);
    });
});

app.listen(port, function () {
  console.log("Listening on port 3000");
});
