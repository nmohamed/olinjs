var Burger = require('../models/burgerModel.js');
var Twots = require('../models/twotModel.js');
var mongoose = require('mongoose');
var path = require('path');

/* LOGIN PAGE */

var login = function(req, res, next){
	res.render('login');
};

module.exports.login = login;


/* INDEX PAGE */

//show all twots
var indexTwot = function(req, res){
	Twots.find({}, function(err, twot){
		res.render('indexTwot', {
			allTwots: twot
		});
	});
};

module.exports.indexTwot = indexTwot;

//add new twot
var addTwot = function(req, res){
	var twot = new Twots({
		username: req.body.username,
		twot: req.body.twot
		});
	twot.save(function (err) {
		if (err) console.log("error occured when adding twot", err);
		else console.log('twot added successfully.');
	});
	req.body.id = twot.id;
	res.send(req.body);
};

module.exports.addTwot = addTwot;

//delete twot
var deleteTwot = function(req, res){
	var id = req.body._id;
	Twots.findOneAndRemove({_id: id}, function (err, data) {
		if (err) console.log('err:', err);
		else res.send({message: 'deleted twot ' + id});
	});
};

module.exports.deleteTwot = deleteTwot;

//edit twot
var editTwot = function (req, res){
	var id = req.body._id;
	var twot = req.body.twot;
	var username = req.body.username;
	console.log(id + ": @" + username + " - " + twot);

	Twots.findOneAndUpdate({_id: id}, req.body, function (err, twots){
		if (err) console.log(err);
		else res.send({message: 'edited twot ' + id});
	});
};

module.exports.editTwot = editTwot;