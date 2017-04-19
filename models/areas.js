var mongoose = require('mongoose');
var Attraction = require('./attractions.js');

var areaSchema = mongoose.Schema({
	name: String,
	attractions: [Attraction.schema]
});

var area = mongoose.model('Area', areaSchema);

module.exports = area;
