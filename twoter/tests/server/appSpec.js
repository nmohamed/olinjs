var request = require('supertest');
var app = require('./../../app.js');

describe("The app", function() {
  it('should return 200 OK on GET /', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should respond with the correct html on GET /', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect('Content-Length', '824', done); // ...or this way, inline!
    // Looks good to me! I'm assuming you're checking content length because
    // the page at / is static (doesn't change depending on what's in your database) --
    // we weren't clear enough about that in our example, but it seems like you figured it out.
  });

  it('should return 200 OK on GET /index', function(done) {
    request(app)
      .get('/index')
      .expect(200, done);
  });

  it('should return 404 on GET /notaroute', function(done) {
    request(app)
      .get('/notaroute')
      .expect(404, done);
  });
});
