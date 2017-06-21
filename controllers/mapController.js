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

exports.createTrip = (req, res) => {
	let newTrip = new Trip()
	// destination: { type: String, required: true },
	// longitude : { type: Number, required: true},
	// latitude : { type: Number, required: true},
	// places: [{type: mongoose.Schema.ObjectId, ref: 'Place'}],
	// user : {type: mongoose.Schema.ObjectId, ref: 'User'}
	newTrip.destination = req.body.destination
	newTrip.longitude = req.body.lng
	newTrip.latitude = req.body.lat
	newTrip.places = req.body.places
	newTrip.user = req.body.user

	newTrip.save((err, trip) => {
		if (err) res.json({message: 'could not save new trip because: ' + err})
		res.send(trip)
	})
}

exports.getAll = (req, res) => {
	Trip.find((err, trips) => {
		if (err) res.json({message: 'could not find trips because: ' + err})
		console.log('getting all')
		res.render('destination', {
			title: 'destination',
			destinations: trips
		})
	})
}

exports.getOne = (req, res) => {
	const id = req.params.id
	Trip.findById({_id: id}, (err, trip) => {
		if (err) res.json({message: 'could not find trip by id because: ' + err})
		res.render('destination', {
			title: 'destination',
			destination: trip
		})
	})
}
