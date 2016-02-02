var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var index = require('./routes/index');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var hbs = exphbs.create({
	defaultLayout: 'main',
	helpers: {
		christmas: function(){
			var date = new Date();
			 console.log("day " + date.getDate() + ", month " + date.getMonth());
			if (date.getDate() === 25 && date.getMonth() === 11){
				return 'yes';
			} else{
				return 'no';
			}
		}
	}
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/olin', index.olin);

app.listen(3000);