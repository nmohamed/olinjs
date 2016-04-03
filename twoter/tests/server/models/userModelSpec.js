require('./../../../app'); // to connect to the database
var expect = require('chai').expect;
var User = require('./../../../models/userModel');

describe('user Model', function() {
  it('should create a new user', function(done) {
    var user = new User({
      username: 'Person',
      password: 'passwd'
    });
    user.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // What else can you test?

  it('should remove a twot by username', function(done) {
    User.remove({ username: 'Person' }, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});

/* Structurally, this looks great to me! I like that your describe(...) includes an it(...)
   for adding an object and an it(...) for removing the same object... it's generally good practice
   for a test to "clean up after itself" -- leave the database unmodified.

   With that in mind -- "Person" is a pretty good name to give the user you're going to try saving...
   seems reasonably likely that no actual user of your app will have the name "Person". That said, we really
   want to avoid modifying the database, and your User.remove(...) the way it's set up now would
   remove *all* users with the name "Person" (the one your test created and any that are already there). For
   extra security, I think I'd try to pick a more unique name (if only because if you and someone else ran this
   test against the same remote database at the same time, one of you could delete the other's saved person along with
   your own). It doesn't really matter whether the name of the person you're trying to save makes semantic sense
   in the context of a twitter app or not... so, here's what I've seen people do: come up with some long,
   fairly-likely-to-be-unique string using the current unix epoch time, or a random number, or both concatenated.
   Not a big deal in this context, but safer in production.
*/
