const mongoose = require("mongoose");
const bcrypt   = require('bcrypt-nodejs');

var tripSchema = new mongoose.Schema({

	destination: { type: String, required: true },
	longitude : { type: Number, required: true},
	latitude : { type: Number, required: true},
	places: [{type: mongoose.Schema.ObjectId, ref: 'Place'}],
	user : {type: mongoose.Schema.ObjectId, ref: 'User'}

});




tripSchema.pre('remove', function(next){

    this.model('User').update(
        {_id: this.user},
        {$pull: {trips: this._id}},
        {multi: true},
        function(err, numAffected) {

    		next()
        }
    );


});

const Trip = mongoose.model('Trip', tripSchema);


module.exports = Trip;
