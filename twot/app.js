var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');

var hbs = exphbs.create({defaultLayout: 'main'});

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

app.get('/', index.loginPage);
app.post('/login', index.login);
app.get('/index', index.indexTwot);
app.post('/delete', index.deleteTwot);
app.post('/add', index.addTwot);


app.listen(3000);