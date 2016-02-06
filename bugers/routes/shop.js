var Burger = require('../models/burgerModel.js');
var Ingredients = require('../models/ingredientsModel.js');
var mongoose = require('mongoose');

/* INGREDIENTS PAGE */

//GET ingredients from db
var ingredientsGET = function(req, res){
	Ingredients.find({}, function(err, ingredients){
		res.render('ingredients', {
			inStock: ingredients
		});
	});
};

module.exports.ingredientsGET = ingredientsGET;

//POST new ingredients to db
var ingredientsPOST = function(req, res){
	var ing = new Ingredients(req.body);
	ing.save(function (err) {
		if (err) console.log("errorr occured when adding ingredient", err);
		else console.log('ingredient added successfully.');
	});
	req.body.id = ing.id;
	res.send(req.body);
};

module.exports.ingredientsPOST = ingredientsPOST;


//DELETE ingredients from db
var ingredientsDELETE = function(req, res){
	var id = req.body._id;
	Ingredients.findOneAndRemove({_id: id}, function (err, data) {
		if (err) console.log('err:', err);
		else res.send({message: 'deleted ingredient ' + id});
	});
};

module.exports.ingredientsDELETE = ingredientsDELETE;


/* ORDERS PAGE */

var newOrder = function(req, res){
	res.render('newOrder', 'neworder');
};

module.exports.newOrder = newOrder;

/* KITCHEN PAGE */

var allOrders = function(req, res){
	res.render('allOrders', 'sdf');
};

module.exports.allOrders = allOrders;