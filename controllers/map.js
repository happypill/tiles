var User   = require('../models/user');
var Trip   = require('../models/trip');
var Place   = require('../models/place');

exports.showCreateTripForm=(req,res)=> {

	res.render('trip', { message: req.flash('errorMessage') });


};

exports.getMap = (req, res) => {
  res.render('destination', {
    title: 'Choose your destination'
  });
};
exports.createPlace=(req,res)=> {

	var place = new Place(req.body.place);
	place.save(function(err, place) {
		if(err) return res.status(500).send(err);

		var tripId = req.body.place.trip;
		Trip.findOne({ _id : tripId} , function(err, trip) {
			trip.places.push(place._id);
			trip.save();
		});
		res.status(201).send(place);

	})
}
exports.createTrip=(req,res)=> {

	var trip = new Trip(req.body.trip);
	trip.save(function(err, trip) {
		if(err) return res.status(500).send(err);

		var userId = req.body.trip.user;
		User.findOne({ _id : userId} , function(err, user) {
			user.trips.push(trip._id);
			user.save();
		});
		res.status(201).send(trip);
	})
}




exports.createPlace=(req,res)=> {

	var place = new Place(req.body.place);
	place.save(function(err, place) {
		if(err) return res.status(500).send(err);

		var tripId = req.body.place.trip;
		Trip.findOne({ _id : tripId} , function(err, trip) {
			trip.places.push(place._id);
			trip.save();
		});
		res.status(201).send(place);

	})
}

exports.removePlace=(req,res)=> {

	var tripId = req.params.tripid;
	var placeId = req.params.placeid;

	Place.findOne({ _id: placeId}, function(err, place) {
		place.remove();

		if (err) return res.status(500).send(err);
		res.status(200).send();

	})
}






exports.showTripSummary=(req,res)=> {

	var id = req.params.id;

	Trip.findOne({_id: id}).populate('places').exec(function(err, trip) {

		if (err) return res.status(500).send(err);

		var newTripObject = {

			destination : trip.destination,
			longitude   : trip.longitude,
			latitude    : trip.latitude,
			placesArray : trip.places
		}

		res.status(200).send(newTripObject);

	})
}





exports.showTripsList=(req,res)=>{

	var id = req.params.id;

	console.log(id);

	User.findOne({ _id: id}).populate('trips').exec(function(err, user) {

		if (err) return res.status(500).send(err);
		res.status(200).send(user.trips);

	})
}





exports.removeTrip=(req,res)=> {

	var id = req.params.id;

	Trip.findOne({ _id: id}, function(err, trip) {
		console.log(trip);
		trip.remove();

		if (err) return res.status(500).send(err);
		res.status(200).send();

	})
}
