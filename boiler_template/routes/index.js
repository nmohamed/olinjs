var home = function(req, res, next){
	res.render('home');
};

module.exports.home = home;

var olin = function(req, res){
  res.render('olin');
};

module.exports.olin = olin;