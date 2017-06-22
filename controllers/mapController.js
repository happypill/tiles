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
  newTrip.destination = req.body.destination
  newTrip.longitude= req.body.longitude
  newTrip.latitude = req.body.latitude
  newTrip.places = req.body.places
  newTrip.user = req.body.user

  console.log(req.body);
  newTrip.save((err, trip) => {
    if (err) return res.json({message: 'could not save new trip because: ' + err})
    res.redirect('/destination');
  })
}


exports.getAll = (req, res) => {
  Trip.find((err, trips) => {
    if (err) res.json({message: 'could not find trips because: ' + err})
    console.log('getting all')
    res.render('destination', {
      title: 'destinations',
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
function removeTrip(req,res) {

  var id = req.params.id;

  Trip.findOne({ _id: id}, function(err, trip) {
    console.log(trip);
    trip.remove();

    if (err) return res.status(500).send(err);
    res.status(200).send();

  })
}
