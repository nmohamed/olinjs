var express = require('express');
var router = express.Router();

var path = require('path');
var catData = require('./catData');
var catColors = catData.colors;
var numColors = catColors.length;
var catNames = catData.names;
var numNames = catNames.length;

var Cat = require('../models/catModel.js');
var mongoose = require('mongoose');

function renderCat(){
	var cat = {
		name: catNames[Math.floor(Math.random() * numNames - 1)],
		color: catColors[Math.floor(Math.random() * numColors - 1)],
		age: Math.round(Math.random() * 100)
	};
	return cat;
}


var listCats = function(req, res){
	Cat.find({}, function(err, allCats) { 
		// If listing by color...
		if (req.params.color) {
			var colord = req.params.color.toLowerCase();
			var sortedCats = [];
			Cat.find({color: {$eq: colord }}, function(err, colorCats){
				res.render('cats', {
					message: colord,
					cats: colorCats
				});
			});
			// for (var i = 0; i < allCats.length; i++) {
			// 	if (allCats[i].color.toLowerCase() === color){
			// 		console.log("your cats: " + allCats[i]);
			// 		sortedCats.push(allCats[i]);
			// 	}
			// };

			// res.render('cats', {
			// 	message: color,
			// 	cats: sortedCats
			// });
		} else {
			res.render('cats', {
				message: 'nice',
				cats: allCats
			});
		}

	});
};

module.exports.listCats = listCats;

var newCat = function(req, res){
	var cat = renderCat();

	var newCat = new Cat(cat);
        newCat.save(function (err) {
            if (err) {
                console.log("Error occured when adding cat.", err);
            } else {
                console.log("Success!");
                res.render('newcat', cat);
            }
        });

};

module.exports.newCat = newCat;

var deleteCat = function(req, res){
	Cat.find({}, function(err, cats) { 
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

			var index = function catIndex(){
				for (var i = 0; i < cats.length; i++) {
					if (cats[i] === sortedCats[0]){
						return i;
					}
				};
			}();

			Cat.remove(cats[index], function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("successfully removed cat: " + cats[index]);
					res.render('newcat', sortedCats[0]);
				}
			});
		}
	});
};

module.exports.deleteCat = deleteCat;