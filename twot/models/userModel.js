var mongoose = require('mongoose');

// Create a Schema
var userSchema = mongoose.Schema({
  username: String,
  password: String
});

module.exports = mongoose.model("Users", userSchema);