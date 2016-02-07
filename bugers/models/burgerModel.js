var mongoose = require('mongoose');

// Create a Schema
var burgerSchema = mongoose.Schema({
  ingredients: Array,
  total: Number
});

module.exports = mongoose.model("Burger", burgerSchema);