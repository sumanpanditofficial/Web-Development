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
//this is the most common thing in the internet so dumb that is no more in the control of the means of the
//transportation of the meaning the moving of goods from one place to another in which it will be called as 
//smuggling which is the serious matter of america and nepal due to which it is called the moral support is
// is the life time imprison jell which is caused by the whole in the concert in which it is called the 
//in which is because of the whole judicial system in which it is meant to be murder in a way which has 
// in the huston so it should be so mean in the life time in which is called the whole judicial system
// which will be caused to be the whole order of the system called the whole in the day of the nightmare in
// my dream which will be build in such a way that it will never collapse.