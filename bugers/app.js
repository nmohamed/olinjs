var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var shop = require('./routes/shop');

var hbs = exphbs.create({defaultLayout: 'main'});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/burgerdb');

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/ingredients', shop.ingredientsGET);
app.post('/delete', shop.ingredientsDELETE);
app.post('/ingredients', shop.ingredientsPOST);
app.get('/order', shop.order);
app.post('/makeOrder', shop.makeOrder);
app.get('/kitchen', shop.kitchen);
app.post('/deleteKitchen', shop.deleteKitchen);


app.listen(3000);