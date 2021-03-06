var express = require('express');
var Area = require('../models/areas.js');
var Attraction = require('../models/attractions.js');
var router = express.Router();
var bcrypt = require('bcrypt');

//========================================================================

//INDEX ROUTE=============================================================

//SHOW INDEX PAGE
router.get('/', function(req, res){
	if(req.session.currentuser){
	Area.find({}, function(err, foundAreas){
		res.render('areas/index.ejs', {
			areas: foundAreas,
			currentUser: req.session.currentUser
			});
		})
	} else {
		res.render("sessions/pleaselogin.ejs");
	}
});

//CREATE~NEW ROUTE=========================================================
router.get('/new', function(req, res){
	res.render('areas/new.ejs');
});

router.post('/', function(req, res){
	Area.create(req.body, function(err, createdArea){
		res.redirect('/areas');
	});
});

//SHOW ROUTE==================================================================
router.get('/:id', function(req, res){
	Area.findById(req.params.id, function(err, foundArea){
		res.render('areas/show.ejs', {
			area: foundArea
		});
	});
});

//DELETE ROUTE================================================================
router.delete('/:id', function(req, res){
	Area.findByIdAndRemove(req.params.id, function(err, foundArea){
		var attractionIds = [];
		for (var i = 0; i < foundArea.attractions.length; i++) {
			attractionIds.push(foundArea.attractions[i]._id);
		}
		Attraction.remove(
			{
				_id : {
					$in: attractionIds
				}
			},
			function(err, data){
				res.redirect('/areas');
			}
		);
	});
});

//EDIT~UPDATE ROUTE=======================================================
router.get('/:id/edit', function(req, res){
	Area.findById(req.params.id, function(err, foundArea){
		res.render('areas/edit.ejs', {
			area: foundArea
		});
	});
});

router.put('/:id', function(req, res){
	Area.findByIdAndUpdate(req.params.id, req.body, function(){
		res.redirect('/areas');
	});
});

//=======================================================================
module.exports = router;
