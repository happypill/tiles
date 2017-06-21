const mongoose = require("mongoose");
const bcrypt   = require('bcrypt-nodejs');

var tripSchema = new mongoose.Schema({

	destination: { type: String, required: true },
	longitude : { type: Number, required: true},
	latitude : { type: Number, required: true},
	places: [{type: mongoose.Schema.ObjectId, ref: 'Place'}],
	user : {type: mongoose.Schema.ObjectId, ref: 'User'}

});

var TripSchema = new mongoose.Schema({
    start: String,
    destination: String,
    beginDate: Date,
    endDate: Date,
    created_at: {type: Date, default: new Date()},
    updated_at: {type: Date, default: new Date()},
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
tripSchema.pre('remove', function(next){
    console.log("pre function called");
    console.log(this)
    this.model('Trip').remove({ user: this._id}).exec();
    next();
})

const Trip = mongoose.model('Trip', tripSchema);


module.exports = Trip;
