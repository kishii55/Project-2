var mongoose = require('mongoose');
var Area = require('../models/areas.js');

var attractionSchema = mongoose.Schema({
	theme:String,
	description:String
});

var Attraction = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction;
