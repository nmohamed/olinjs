var mongoose = require('mongoose');

// Create a Schema
// As a note, instead of assigning the ingredients to be an array, you can
// create your burger model as follows:

// var orderSchema = mongoose.Schema({
// 	ingredients : [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredients'}],
//  total: Number
// });

// Hence, you are using the ingredients schema as the object that will populate the
// items in your ingredients list :) Let me know if you have any questions on this and we can
// discuss it in person


var burgerSchema = mongoose.Schema({
  ingredients: Array,
  total: Number
});

module.exports = mongoose.model("Burger", burgerSchema);