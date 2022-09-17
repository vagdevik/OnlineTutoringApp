var express = require('express');
var router = express.Router();

var monk = require('monk'); 
var db = monk('localhost:27017/fp3'); 
var collection = db.get('appointments'); 


/* GET home page. */
router.get('/appointments', function(req, res) {
 collection.find({}, function(err, tutors)
  { if(err) throw err;
     res.json(tutors);

  });
  
});



// GET id
router.get('/appointments/:id', function(req, res) {
   collection.find({userID: req.params.id}, function(err, tutor)
   { 
    console.log("in GETid call"); 
     if(err) {
       console.log("GET for id call");
       throw err;
    }
      res.json(tutor);
 
   });
   
 });


 // GET id for tutor
router.get('/appointments1/:id', function(req, res) {
   collection.find({tutorID: req.params.id}, function(err, tutor)
   { 
    console.log("in GETid call"); 
     if(err) {
       console.log("GET for id call");
       throw err;
    }
      res.json(tutor);
 
   });
   
 });



//insert
router.post('/appointments', function(req, res) {
   collection.insert({
userID: req.body.userID,
tutorName: req.body.tutorName,
tutorID: req.body.tutorID,
date: req.body.date,
time: req.body.time

   }, function(err, video)
   { if(err) throw err;
      res.json(video);
 
   });
   
 });



module.exports = router;

