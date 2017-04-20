var mongoose = require('mongoose');

var attractionSchema = mongoose.Schema({
	theme:String,
	description:String,
	characters:String
});

var Attraction = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction;
