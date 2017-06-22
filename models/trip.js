const mongoose = require("mongoose");
const bcrypt   = require('bcrypt-nodejs');

var tripSchema = new mongoose.Schema({
    trip_id : { type: String, required: true },
  destination: { type: String, required: true },
  longitude : { type: Number, required: true},
  latitude : { type: Number, required: true}
})

tripSchema.pre('remove', function(next){
    console.log("pre function called");
    console.log(this)
    this.model('Trip').remove({ user: this._id}).exec();
    next();
})

const Trip = mongoose.model('Trip', tripSchema);


module.exports = Trip;
