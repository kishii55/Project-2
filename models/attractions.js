var mongoose = require('mongoose');

var attractionSchema = mongoose.Schema({
	title:String,
	body:String
});

var Attraction = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction;
