var mongoose = require('mongoose');

// Create a Schema
// You are missing the "inStock" boolean key for the ingredient model. In other
// words, if we label an ingredient as outOfStock then it should be appended to a list
// of out-of-stock items and not deleted from the db.
var ingredientsSchema = mongoose.Schema({
  ingredient: String,
  price: Number
});

module.exports = mongoose.model("Ingredients", ingredientsSchema);