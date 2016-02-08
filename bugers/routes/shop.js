var Burger = require('../models/burgerModel.js');
var Ingredients = require('../models/ingredientsModel.js');
var mongoose = require('mongoose');
var path = require('path');

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
		if (err) console.log("error occured when adding ingredient", err);
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

//EDIT ingredients from db
var ingredientsEDIT = function (req, res){
	var id = req.body._id;
	var ingr = req.body.ingredient;
	var price = req.body.price;
	console.log(id + ": " + ingr + ", $ " + price);

	Ingredients.findOneAndUpdate({_id: id}, req.body, function (err, ingredient){
		if (err) console.log(err);
		else res.send({message: 'edited ingredient ' + id});
	});
};

module.exports.ingredientsEDIT = ingredientsEDIT;


/* ORDERS PAGE */

var order = function(req, res){
	Ingredients.find({}, function(err, ingredients){
		res.render('order', {
			inStock: ingredients
		});
	});
};

module.exports.order = order;

var makeOrder = function(req, res){
	var burger = new Burger({ingredients: req.body['ingr[]'], total: req.body.total});
	burger.save(function (err) {
	 	if (err) console.log('err:', err);
	 	else res.sendFile(path.join(__dirname, "../public/images/cat.jpg"));
	 });
};

module.exports.makeOrder = makeOrder;


/* KITCHEN PAGE */

// show current orders
var kitchen = function(req, res){
	Burger.find({}, function(err, burger_content){
		res.render('kitchen', {
			burger: burger_content
		});
	});
};

module.exports.kitchen = kitchen;

var deleteKitchen = function (req, res) {
	var id = req.body._id;
	Burger.findOneAndRemove({_id: id}, function (err, data) {
		if (err) console.log('err:', err);
		else res.send({message: 'deleted burger ' + id});
	});
};

module.exports.deleteKitchen = deleteKitchen;