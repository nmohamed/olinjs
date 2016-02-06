var mongoose = require('mongoose');

// Create a Schema
var ingredientsSchema = mongoose.Schema({
  ingredient: String,
  price: Number
});

module.exports = mongoose.model("Ingredients", ingredientsSchema);