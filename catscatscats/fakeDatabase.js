var Cat = require('./models/catModel.js');
var mongoose = require('mongoose');

var FakeDatabase = module.exports = {

    data: [],

    addCat: function(obj) {
        var cat = new Cat(obj);
        //console.log(obj.name);
        console.log(cat.name);
        cat.save(function (err) {
            if (err) {
                console.log("Error occured when adding cat.", err);
            } else {
                console.log("Success!");
            }
        });

        //adds item to end of array holding data
        FakeDatabase.data.push(obj);
    },

    removeCat: function(index) {
        //removes item located at index in array and returns it
        console.log("Removing cat: " + FakeDatabase.data[index]);
        return FakeDatabase.data.splice(index,1);
    }
}