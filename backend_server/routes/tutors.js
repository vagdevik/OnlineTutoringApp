var express = require('express');
var router = express.Router();

var monk = require('monk'); 
var db = monk('localhost:27017/fp3'); 
var collection = db.get('tutors'); 


/* GET home page. */
router.get('/', function(req, res) {
 collection.find({}, function(err, tutors)
  { if(err) throw err;
     res.json(tutors);

  });
  
});

//get

router.get('/:id', function(req, res) {
  collection.find({_id: req.params.id}, function(err, tutor)
  { if(err) throw err;
     res.json(tutor);

  });
  
});


/*
{
   "name" : "Parker",
   "subject": "Physics",
   "rating" : "4.9",
   "about_me" : "I enjoy explaining physcis concepts and theory. I am happy to help you in your learning journey.",
   "working_hours": "09.00 am - 03.00 pm",
   "certifications":["Berkeley Physics International Education", "International Medical Physics certification"],
   "image_url": "https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/01/tips-for-professional-portraits.jpg"
  }
*/
//insert
router.post('/', function(req, res) {
   collection.insert({
name: req.body.name,
subject: req.body.subject,
rating: req.body.rating,
about_me: req.body.about_me,
certifications: req.body.certifications,
image_url: req.body.image_url

   }, function(err, tutor)
   { if(err) throw err;
      res.json(tutor);
 
   });
   
 });


//update
 router.put('/:id', function(req, res) {
   collection.update({_id: req.params.id}, {$set: {
      name: req.body.name,
      subject: req.body.subject,
      rating: req.body.rating,
      about_me: req.body.about_me,
      certifications: req.body.certifications,
      image_url: req.body.image_url
      

   }},
      
      function(err, tutor)
   { if(err) throw err;
      res.json(tutor);
 
   });
   
 });
 

//delete
 router.delete('/:id', function(req, res) {
   collection.remove({ _id: req.params.id }, function(err, tutor)
   { if(err) throw err;
      res.json(tutor);
 
   });
 });

module.exports = router;

