var express = require('express');
var router = express.Router();


const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const bcrypt = require('bcryptjs');

var monk = require('monk');
const { response } = require('express');
var db = monk('localhost:27017/fp3');
var db2 = monk('localhost:27017/fp3'); 
var collection = db.get('users');
var collection2 = db2.get('tutors');



router.get('/', function(req, res) {
	res.render('index', { title: 'Express'} );

});

//protected route
router.get('/welcome', auth, function(req, res) {
 	res.json({ message: "Welcome!!" } );
});

/*router.get('/register', async(req, res) => {
   const newPassword = await bcrypt.hash('password', 10);
   console.log("yuva");
            console.log('@@@@ ',newPassword);
   res.json({ message: "Welcome!!" } );

});*/


router.post('/register', async(req, res) => {
	
	//const {username, email, password } = req.body;
	const username = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const type = 0;

	console.log("***",username, email, password, type);
	console.log(req.body);
   let newPassword = "";
   if (password) {
      newPassword = await bcrypt.hash(password, 10);
   }
	if(!(username && email && password)){
		console.log("All fields are required!");
		res.json( { error: "All fields are required!" } );
	}
	else{

		collection.findOne({ email: email }, function(err, user){
			if (err){
				console.log("find error");
				throw err;
			}

			if (user){
				console.log("User already exists. Please login!");
				res.json({ error : "User already exists. Please login!"} );
			}
         
			else{

            //email input validation
            var email_pattern = new RegExp('[A-Za-z0-9]+@[a-z]+\.[a-z]{2,3}$');
            var password_pattern = new RegExp('^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\[!,@,#,$,%,^,&,*,+]).*$');
			const name = username;
            if (!email_pattern.test(email)) {
				console.log("Enter a valid email address");
               res.json({ error : "Enter a valid email address"} );
            }

            //password validation
            
            else if (password.length < 6 || !password_pattern.test(password)) {
				console.log("Enter a valid password");
               res.json({ error : "Enter a valid password"} );
            }
            else {
				let newUser = {
					name,
					email,
					password:newPassword,
					type
				}
				collection.insert(newUser, function(err, user){
					
                     if (err) {
						 console.log("insert err"); 
						 throw err;
					 }
					 var token = jwt.sign({ user_id: user._id, email}, 'secretkey');

					 if (token){
						user.token = token;

					 }
					 res.json(user);

				})
         }


			}


		});	

	}



});

router.post('/register_tutor', async(req, res) => {
	
	//const {username, email, password } = req.body;
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const subject = req.body.subject;
	const working_hours = req.body.working_hours;
	const about_me = req.body.about_me;
	const image_url = req.body.image_url;
	const rating = "";
	const appointments = "";
	const certifications = req.body.certifications;
	const type = 1;

	console.log("***",name, email, password, subject, working_hours, about_me,image_url, certifications, type);
	console.log(req.body);
   let newPassword = "";
   if (password) {
      newPassword = await bcrypt.hash(password, 10);
   }
	if(!(name && email && password)){
		console.log("All fields are required!");
		res.json( { error: "All fields are required!" } );
	}
	else{

			collection2.findOne({ email: email }, function(err, user){
			if (err){
				console.log("find error");
				throw err;
			}

			if (user){
				console.log("User already exists. Please login!");
				res.json({ error : "User already exists. Please login!"} );
			}
         
			else{

            //email input validation
            var email_pattern = new RegExp('[A-Za-z0-9]+@[a-z]+\.[a-z]{2,3}$');
            var password_pattern = new RegExp('^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\[!,@,#,$,%,^,&,*,+]).*$');

            if (!email_pattern.test(email)) {
				console.log("Enter a valid email address");
               res.json({ error : "Enter a valid email address"} );
            }

            //password validation
            
            else if (password.length < 6 || !password_pattern.test(password)) {
				console.log("Enter a valid password");
               res.json({ error : "Enter a valid password"} );
            }
            else {
				let newUser = {
					name,
					email,
					password:newPassword,
					subject,
					rating,
					about_me,
					working_hours,
					appointments,
					certifications,
					image_url,
					type
				}
				console.log("inserting")
				collection2.insert(newUser, function(err, user){
					
                     if (err) {
						 console.log("insert err"); 
						 throw err;
					 }
					 var token = jwt.sign({ user_id: user._id, email}, 'secretkey');

					 if (token){
						user.token = token;

					 }
					 res.json(user);

				})
         }


			}


		});	

	}



});

router.post('/login', async(req, res) => {
	const email = req.body.email;
	const password = req.body.password;
    console.log(req.body);
	console.log(email, password);
   let newPassword = "";
   if (password) {
      newPassword = await bcrypt.hash(password, 10);
   }
	if(!(email && password)){
		console.log("All fields are required!");
		res.json({ error: "All fields are required!" } );
	}
	else{

		collection.findOne({ email: email }, function(err, user){
			if (err) {
				console.log("find failed");
				throw err;
			}
			if(user == null){
                collection2.findOne({ email: email }, function(err, user) {
                    if (err) {
                        console.log("2- find failed");
                        throw err;
                    }
                    
                    if(user == null){
				        console.log("2- User doesn't exist");
				        res.json({ error: "2- User doesn't exist" } );
                    }
                    else{
                        bcrypt.compare(password, user.password, function(err, resp) {
                           if (err){
                             console.log("bcrypt failed");
                             throw err;
                           }
                           if (resp) {
                             // Send JWT
                             var token = jwt.sign({ user_id: user._id, email}, 'secretkey');
                                  user.token = token;
                                  console.log("2- user token");
                                  res.json(user);
                           } else {
                             // response is OutgoingMessage object that server response http request
                             console.log("2- User email or password is incorrect!");
                             res.json( {error: "2- User email or password is incorrect!" } );
                           }
                         });
                        //const newPassword = bcrypt.hash(password, 10)
                            /*if (user.password === newPassword ){
                                var token = jwt.sign({ user_id: user._id, email}, 'secretkey');
                                user.token = token;
                                res.json(user);
            
                            }
                            else{
                                //res.json( {error: "User email or password is incorrect!" } );
                           res.json(newPassword)
            
                            }*/
            
                        }
                }
            
        )}
        else{
            bcrypt.compare(password, user.password, function(err, resp) {
               if (err){
                 console.log("bcrypt failed");
                 throw err;
               }
               if (resp) {
                 // Send JWT
                 var token = jwt.sign({ user_id: user._id, email}, 'secretkey');
                      user.token = token;
                      console.log("user token");
                      res.json(user);
               } else {
                 // response is OutgoingMessage object that server response http request
                 console.log("User email or password is incorrect!");
                 res.json( {error: "User email or password is incorrect!" } );
               }
             });
            //const newPassword = bcrypt.hash(password, 10)
                /*if (user.password === newPassword ){
                    var token = jwt.sign({ user_id: user._id, email}, 'secretkey');
                    user.token = token;
                    res.json(user);

                }
                else{
                    //res.json( {error: "User email or password is incorrect!" } );
               res.json(newPassword)

                }*/

            }
			

		});

	}

});




module.exports = router;