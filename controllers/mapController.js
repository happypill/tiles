var User   = require('../models/User');
var Trip   = require('../models/Trip');
var Place   = require('../models/Place');


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
