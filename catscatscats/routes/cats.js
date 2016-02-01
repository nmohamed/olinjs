var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');

var path = require('path');
var catData = require('./catData');
var catColors = catData.colors;
var numColors = catColors.length;
var catNames = catData.names;
var numNames = catNames.length;

var cats = {};


function renderCat(){
	var cat = {
		name: catNames[Math.floor(Math.random() * numNames - 1)],
		color: catColors[Math.floor(Math.random() * numColors - 1)],
		age: Math.round(Math.random() * 100)
	};
	return cat;
}

var listCats = function(req, res){
	var allCats = db.getAll();
	// If listing by color...
	if (req.params.color) {
		var color = req.params.color.toLowerCase();
		var sortedCats = [];
		for (var i = 0; i < allCats.length; i++) {
			if (allCats[i].color.toLowerCase() === color){
				console.log("your cats: " + allCats[i]);
				sortedCats.push(allCats[i]);
			}
		};

		res.render('cats', {
			message: color,
			cats: sortedCats
		});
	} else {
		res.render('cats', {
			message: 'nice',
			cats: allCats
		});
	}
};

module.exports.listCats = listCats;

var newCat = function(req, res){
	var cat = renderCat();
	res.render('newcat', cat);
	db.addCat(cat);
};

module.exports.newCat = newCat;

var deleteCat = function(req, res){
	var cats = db.getAll();

	if (cats.length === 0) {
		res.render('newcat', {
			name: 'wait a second you dont have any cats',
			color: 'no',
			age: "doesn't exist"
		});
	} else {
		var lastCat = cats.length - 1;
		var sortedCats = cats.slice();
		sortedCats.sort(function(a, b){
			return b.age - a.age;
		});

		res.render('newcat', sortedCats[0]);


		function catIndex(){
			for (var i = 0; i < cats.length; i++) {
				if (cats[i] === sortedCats[0]){
					return i;
				}
			};
		}

		db.removeCat(catIndex());
	}
};

module.exports.deleteCat = deleteCat;