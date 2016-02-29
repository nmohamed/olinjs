var mongoose = require('mongoose');
var path = require('path');

/* HOME */

var routes = {};
var items = [];
// var item = {
// 	text: String,
// 	_id: Number,
// 	checked: Boolean
// };

routes.home = function(req, res){
	res.render('home', {});
};

module.exports = routes;