const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
  if (username === 'admin' && password === 'password') {
    return done(null, { id: 1, username: 'admin' });
  } else {
    return done(null, false, { message: 'Invalid username or password' });
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = { id: 1, username: 'admin' };
  done(null, user);
});


app.get('/profile', isAuthenticated, (req, res) => {
  res.send('Profile page');
});


app.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
}));


app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
