require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

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

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);


passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.route("/").get((req, res) => {
  res.render("home");
});

app.route("/login").get((req, res) => {
  res.render("login");
});

app.route("/register").get((req, res) => {
  res.render("register");
});
app.route("/secrets").get((req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) { console.log(err); }
    res.redirect('/');
  });
})

app.post("/register", (req, res) => {
  User.register({ username: req.body.username, active: false }, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    }
    else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      })
    }
  });
});

app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      })
    }
  });
});



app.listen(port, function () {
  console.log("Listening on port 3000");
});


