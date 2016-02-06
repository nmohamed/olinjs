var mongoose = require('mongoose');

// Create a Schema
var burgerSchema = mongoose.Schema({
  ingredients: Array
});

module.exports = mongoose.model("Burger", burgerSchema);