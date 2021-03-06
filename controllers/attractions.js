var express = require('express');
var router = express.Router();
var Attraction = require('../models/attractions.js');
var Area = require('../models/areas.js')
var bcrypt = require('bcrypt');

//=========================================================================

//INDEX ROUTE
router.get('/', function(req, res){
	if(req.session.currentuser){
		Attraction.find({}, function(err, foundAttractions){
			res.render('attractions/index.ejs', {
				attractions: foundAttractions,
				currentUser: req.session.currentUser
			});
		});
	} else {
		res.render("sessions/pleaselogin.ejs");
	}
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

//EDIT~UPDATE ROUTE===========================================================

router.get('/:id/edit', function(req, res){
    Attraction.findById(req.params.id, function(err, foundAttraction){
        Area.find({}, function(err, allAreas){
            console.log(allAreas);
            Area.findOne({'attraction._id':req.params.id}, function(err, foundAttractionArea){
                res.render('attractions/edit.ejs', {
                    attraction: foundAttraction,
                    areas: allAreas,
                    attractionArea: foundAttractionArea
                });
            });
        });
    });
});


router.put('/:id', function(req, res){
    Attraction.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedAttraction){
        Area.findOne({ 'attractions._id' : req.params.id }, function(err, foundArea){
			console.log(req.body);
            if(foundArea._id !== req.body.areaId){
                foundArea.attractions.id(req.params.id).remove();
                foundArea.save(function(err, savedFoundArea){
                    Area.findById(req.body.areaId, function(err, newArea){
                        newArea.attractions.push(updatedAttraction);
                        newArea.save(function(err, savedNewArea){
                            res.redirect('/attractions/'+req.params.id);
                        });
                    });
                });
            } else {
                foundArea.attractions.id(req.params.id).remove();
                foundArea.attractions.push(updatedAttraction);
                foundArea.save(function(err, data){
                    res.redirect('/attractions/'+req.params.id);
                });
            }
        });
    });
});

//============================================================================
module.exports = router;
