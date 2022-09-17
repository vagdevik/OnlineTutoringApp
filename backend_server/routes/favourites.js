var express = require('express');
var router = express.Router();

var monk = require('monk'); 
var db = monk('localhost:27017/fp3'); 
var collection = db.get('favourites'); 


/* GET home page. */
router.get('/', function(req, res) {
 collection.find({}, function(err, tutors)
  { if(err) throw err;
     res.json(tutors);

  });
  
});


router.get('/:id', function(req, res) {
    collection.find({userID: req.params.id}, function(err, tutor)
    { if(err) throw err;
       res.json(tutor);
  
    });
    
  });
//insert
router.post('/', function(req, res) {
   collection.insert({
userID: req.body.userID,
tutorID: req.body.tutorID,
tutorName: req.body.tutorName
   }, function(err, video)
   { if(err) throw err;
      res.json(video);
 
   });
   
 });


// delete
router.delete('/:id', function(req, res) {
   collection.remove({_id: req.params.id}, function(err, video) {
     if (err) throw err;
     res.json(video);
   })
 });
 
 


module.exports = router;

