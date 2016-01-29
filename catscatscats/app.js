var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var cats = require('./routes/cats');

var hbs = exphbs.create({defaultLayout: 'main'});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/cats', cats.listCats);
app.get('/cats/new', cats.newCat);
app.get('/cats/bycolor/:color', cats.listCats);
app.get('/cats/delete/old', cats.deleteCat);


app.listen(3000);