var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

var placeSchema = new mongoose.Schema({

	place_id : String,
	trip : {type: mongoose.Schema.ObjectId, ref: 'Trip'}
});



placeSchema.pre('remove', function(next){
	console.log("pre function called");
	console.log(this)
	this.model('Trip').remove({ user: this._id}).exec();
	next();
})


module.exports = mongoose.model("Place", placeSchema);
