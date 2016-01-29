var FakeDatabase = module.exports = {

    data: [],

    addCat: function(obj) {
        //adds item to end of array holding data
        FakeDatabase.data.push(obj);
    },

    getAll: function() {
        //returns copy of array of all items in the database
        return FakeDatabase.data.slice();
    },

    removeCat: function(index) {
        //removes item located at index in array and returns it
        console.log("Removing cat: " + FakeDatabase.data[index]);
        return FakeDatabase.data.splice(index,1);
    }
}