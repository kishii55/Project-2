//REQUIRE & MIDDLEWARE =======================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));

var areasController = require('./controllers/areas.js');
app.use('/areas', areasController);
var attractionsController = require('./controllers/attractions.js');
app.use('/attractions', attractionsController);

var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/map'

//==========================================================================

app.get('/', function(req, res){
	res.render('index.ejs');
});


//CONNECT TO SERVER AND MONGOOSE=============================================
mongoose.connect(mongoDBURI);

mongoose.connection.once('open', function(){
	console.log('connected my young padawan');
});

app.listen(port, function(){
	console.log('the force is listening' + port);
});
