var Cat = require('./models/catModel.js');

var FakeDatabase = module.exports = {

    data: [],

    addCat: function(obj) {
        var cat = new Cat(obj);
        console.log(obj);
        console.log(cat);
        cat.save(function (err) {
            if (err) {
                console.log("Error occured when adding cat.", err);
            }
        });
        //console.log('adding cat! ' + cat);

        //adds item to end of array holding data
        FakeDatabase.data.push(obj);
    },

    getAll: function() {
        var allMyCats = Cat.find({}, function(err, cats) {
            return cats;
        });
        //returns copy of array of all items in the database
        return allMyCats.slice();
        //return FakeDatabase.data.slice();
    },

    getColor: function(color) {
        return Cat.find({color: color}, callback);
    },

    removeCat: function(index) {
        //removes item located at index in array and returns it
        console.log("Removing cat: " + FakeDatabase.data[index]);
        return FakeDatabase.data.splice(index,1);
    }
}