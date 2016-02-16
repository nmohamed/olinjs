var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var hbs = exphbs.create({defaultLayout: 'main'});

var index = require('./routes/index');
var auth = require('./auth');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twotdb');

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  secret: 'superS3CRE7',
  resave: false,
  saveUninitialized: false ,
  cookie: {}
}));

/* GOOGLE AUTHENTICATION */

var auth = require('./auth');
passport.use(new GoogleStrategy({
    clientID: auth.clientID,
    clientSecret: auth.clientSecret,
    callbackURL: auth.callbackURL,
    returnURL: 'localhost:3000/index'
  },
  function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
));

app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: 'this is not a secret ;)',
  resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/FAIL' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/SUCCESS');
  });

app.get('/user', ensureAuthenticated, function(req, res) {
  res.send(req.user);
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
    res.send(401);
}

/* END GOOGLE AUTHENTICATION*/

app.get('/', index.loginPage);
app.post('/login', index.login);
app.get('/index', index.indexTwot);
app.post('/delete', index.deleteTwot);
app.post('/add', index.addTwot);

app.listen(3000);