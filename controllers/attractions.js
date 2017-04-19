var express = require('express');
var router = express.Router();
var Attraction = require('../models/attractions.js');
var Area = require('../models/areas.js')

//=========================================================================

//INDEX ROUTE
router.get('/', function(req, res){
	Attraction.find({}, function(err, foundAttractions){
		res.render('attractions/index.ejs', {
			attractions: foundAttractions
		});
	})
});


//NEW ROUTE=================================================================
router.get('/new', function(req, res){
    Area.find({}, function(err, allAreas){
        res.render('attractions/new.ejs', {
            areas: allAreas
        });
    });
});

//POST TO PAGE
router.post('/', function(req, res){
    Area.findById(req.body.areaId, function(err, foundArea){
        Attraction.create(req.body, function(err, createdAttraction){
			console.log(createdAttraction);
            foundArea.attractions.push(createdAttraction);
            foundArea.save(function(err, data){
                res.redirect('/attractions');
            });
        });
    });
});


//SHOW ROUTE=================================================================
router.get('/:id', function(req, res){
    Attraction.findById(req.params.id, function(err, foundAttraction){
        Area.findOne({'attractions._id':req.params.id}, function(err, foundArea){
            res.render('attractions/show.ejs', {
                area:foundArea,
                attraction: foundAttraction
            });
        })
    });
});

//DELETE ROUTE================================================================
router.delete('/:id', function(req, res){
    Attraction.findByIdAndRemove(req.params.id, function(err, foundAttraction){
        Area.findOne({'attractions._id':req.params.id}, function(err, foundArea){
            foundArea.attractions.id(req.params.id).remove();
            foundArea.save(function(err, data){
                res.redirect('/attractions');
            });
        });
    });
});

//EDIT~UPDATE ROUTE

//============================================================================
module.exports = router;
