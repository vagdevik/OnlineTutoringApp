var express = require('express');
var router = express.Router();

var monk = require('monk'); 
var db = monk('localhost:27017/fp3'); 
var collection = db.get('tutors'); 


/* GET home page. */
router.get('/tutors', function(req, res) {
 collection.find({}, function(err, tutors)
  { if(err) throw err;
     res.json(tutors);

  });
  
});



router.get('/tutors/:id', function(req, res) {
  collection.find({_id: req.params.id}, function(err, tutor)
  { if(err) throw err;
     res.json(tutor);

  });
  
});


//insert
router.post('/tutors', function(req, res) {
   collection.insert({
title: req.body.title,
genre: req.body.genre,
description: req.body.desc

   }, function(err, video)
   { if(err) throw err;
      res.json(video);
 
   });
   
 });


//update
 router.put('/tutors/:id', function(req, res) {
   collection.update({_id: req.params.id}, {$set: {
      title: req.body.title,
      genre: req.body.genre,
      description: req.body.desc
      

   }},
      
      function(err, video)
   { if(err) throw err;
      res.json(video);
 
   });
   
 });
 

//delete
 router.get('/tutors/:id', function(req, res) {
   collection.remove({_id: req.params.id}, function(err, video)
   { if(err) throw err;
      res.json(video);
 
   });
   //res.render('index', { title: 'Express' });
 });

module.exports = router;

