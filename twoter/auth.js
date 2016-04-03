// Careful about these keys ending up on Github! There are bots out there
// which go looking for this kind of thing & exploit the id/secret pair when they find it :(
// If you're worried -- just go refresh the secret for this app in the Google developer console.
var auth = {
    clientID: '701481820963-bmgv0t1doelqnlp75poaikshqldkar35.apps.googleusercontent.com',
    clientSecret: 'xHpzoy0GQxoOjUAUOrj4MMZK',
    callbackURL: '/auth/google/callback'
  };

  module.exports = auth;
