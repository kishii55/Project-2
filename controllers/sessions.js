var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var bcrypt = require('bcrypt');
//=========================================================================

router.get('/new', function(req, res){
    res.render('sessions/new.ejs');
});

router.post('/', function(req, res){
    User.findOne({ username: req.body.username }, function(err, foundUser){
        if (!foundUser){
          res.render('sessions/incorrect.ejs');
        }
        else if (foundUser){
          if (bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.currentuser = foundUser;
            res.redirect('/');
          } else {
            // res.send('wrong username or password');
            res.render('sessions/incorrect.ejs');
          }
        }
      });
    });

//DELETE ROUTE ===========================================================
router.delete('/', function(req, res){
    req.session.destroy(function(){
        res.redirect('/');
    });
})

//==========================================================================
module.exports = router;
