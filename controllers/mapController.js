var User   = require('../models/user');
var Trip   = require('../models/trip');


exports.showForm=(req,res)=> {

	res.render('trip', {
		message: req.flash('errorMessage')
	});

};

exports.getMap = (req, res) => {
  res.render('destination', {
    title: 'Choose your destination'
  });
};
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('errors', {msg: 'Log in required.'})
  res.redirect('/auth/login');
};
exports.createTrip=(req,res)=>{
	var trip = new Trip(req.body.trip);

}
