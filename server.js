const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI);

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MemoryStore = require('session-memory-store')(session);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    cookieName: 'session',
    secret: '8sghaG*At0Y*Agnalga',
    resave: true,
    saveUninitialized: true,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    store: new MemoryStore()
}));
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user.js');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.use(express.static('./client/public'));

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));

app.post('/register', function(req, res){
  User.find({username: req.body.username}, function(err, users){
    if(err) throw err;
    if(users.length == 0){
      var user = new User({ username: req.body.username, password: req.body.password });
      user.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          req.login(user, function(err){
            if(err) throw err;
            res.redirect('/');
          });
        }
      });
    }
    else{
      res.redirect('/register');
    }
  });
});

app.get('*', function(req, res){
	res.sendFile(__dirname + '/client/public/index.html');
});

app.listen(process.env.PORT || 3000);