var express = require('express');
var router = express.Router();
var Attraction = require('../models/attractions.js');
var Area = require('../models/areas.js')

//=========================================================================

router.get('/', function(req, res){
	Attraction.find({}, function(err, foundAttractions){
		res.render('attractions/index.ejs', {
			attractions: foundAttractions
		});
	})
});

router.get('/new', function(req, res){
    Area.find({}, function(err, allAreas){
        res.render('attractions/new.ejs', {
            areas: allAreas
        });
    });
});

router.post('/', function(req, res){
    Area.findById(req.body.areaId, function(err, foundArea){
        Attraction.create(req.body, function(err, createdAttraction){
			console.log(createdAttraction);
            foundArea.attraction.push(createdAttraction);
            foundArea.save(function(err, data){
                res.redirect('/attractions');
            });
        });
    });
});

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

//============================================================================
module.exports = router;
