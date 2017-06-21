var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

var placeSchema = new mongoose.Schema({

	place_id : String,
	trip : {type: mongoose.Schema.ObjectId, ref: 'Trip'}
});




placeSchema.pre('remove', function(next){

    this.model('Trip').update(
        {_id: this.trip},
        {$pull: {places: this._id}},
        {multi: true},
        function(err, numAffected) {
    		next();
        }
    );

});


module.exports = mongoose.model("Place", placeSchema);
