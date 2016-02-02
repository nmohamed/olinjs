//This type of file is usually found in app/models/catModel.js
var mongoose = require('mongoose');

// Create a Schema
var catSchema = mongoose.Schema({
  name: String,
  color: String,
  age: Number
});

module.exports = mongoose.model("Cat", catSchema);