'use strict';

const express = require('express');
const app = express();
const request = require('request');
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
const Album = require('./models/album.js');

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

app.get('/api/currentuser', function(req, res){
  if(req.user){
    let user = req.user;
    user.password = null;
    res.end(JSON.stringify(req.user));
  }
  else{
    res.end(JSON.stringify(null));
  }
});

app.get('/api/user/:name', function(req, res){
  User.findOne({username: req.params.name}, function(err, user){
    if(err) throw err;
    if(user){
      res.end(JSON.stringify(user));
    }
    else{
      res.end(JSON.stringify(null));
    }
  });
});

app.get('/api/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/api/allalbums', function(req, res){
  Album.find({}, function(err, albums){
    if(err) throw err;
    res.end(JSON.stringify(albums));
  });
});

app.post('/api/editprofile', function(req, res){
  User.findByIdAndUpdate(req.user._id, { 
      $set: { name: req.body.name, city: req.body.city, state: req.body.state }
    }, 
    function (err, user) {
      if (err) throw err;
      res.redirect('/profile');
    }
  );
});

app.post('/api/newalbum', function(req, res){
  const album = encodeURIComponent(req.body.album);
  Album.findOne({name: {$regex: req.body.album, $options: 'i'}}, function(err, al){
    if(err) throw err;
    if(al){
      console.log('found');
      res.redirect('/');
    }
    else{
      const url = 'https://api.spotify.com/v1/search?q='+ album +'&type=album';
      request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const response = JSON.parse(body);
          if(response.albums.items[0]){
            const artist = response.albums.items[0].artists[0].name;
            console.log(artist);
            Album.create({
              name: response.albums.items[0].name,
              image: response.albums.items[0].images[2].url,
              user: req.user.username,
              artist: artist
            }, function(err, a){
              if(err) res.end(JSON.stringify(false));
              User.findByIdAndUpdate(req.user._id, { 
                  $push: { albums: a.name }
                },function (err, user) {
                    if (err) throw err;
                    res.redirect('/');
                  });
            });
          }
          else{
            res.redirect('/');
          }
        }
      });
    }
  });
});

app.post('/api/newtrade', function(req, res){
  const s = req.body.self;
  const o = req.body.other;
  let trade = {
    self: req.body.self,
    other: req.body.other,
    getting: req.body.getting,
    giving: req.body.giving
  }
  User.findOneAndUpdate({name: s}, {$push: {trades: trade}}, function(err){
    if(err) throw err;
    trade.self = req.body.other;
    trade.other = req.body.self;
    trade.getting = req.body.giving;
    trade.giving = req.body.getting;
    User.findOneAndUpdate({name: o}, {$push: {trades: trade}}, function(err){
      console.log(s);
      console.log(o);
      if(err) throw err;
      res.end(JSON.stringify('success'));
    })
  })
});

app.post('/api/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));

app.post('/api/register', function(req, res){
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