import { useParams } from "react-router-dom";
import {useLocation} from "react-router-dom";
import React, { useState,useEffect } from 'react';
import Calendar from 'react-calendar';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';

const UpdateProfile = () => {
  const { id } = useParams();
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ iddddddd:", id);
  const location = useLocation();

  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [expertise, setExpertise] = useState([]);
  const [about, setAbout] = useState([]);
  const [image_url, setImage] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const [workinghrs, setWorkinghrs] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');


  useEffect( () => {
 
         setLoading(true);
         fetch('http://localhost:3000/api/tutors/'+id, {
           headers : { 
             'Content-Type': 'application/json',
              'Accept': 'application/json'
           }
         })
         .then( res => res.json() )
         .then( (data) => { 
             console.log("data fetched:::",data);
             setTutors(data[0]);
             setName(data[0].name);
             setAbout(data[0].about_me);
             setExpertise(data[0].subject);
             setImage(data[0].image_url);
             setWorkinghrs(data[0].working_hours);
             //console.log("setted data after fetch:::",tutors);
             setLoading(false);
         })
         .catch((error) => {
           console.log(error.message);
           setError(error);
           setLoading(false);
 
         })
       }, []);

        const handleNameChange = (e) => {
           const n = document.getElementById("name").value;
           console.log(n);  
           setName(n);

        };
        const handleAboutChange = (e) => {
           const abt = document.getElementById("about").value;
           console.log(abt);  
           setAbout(abt);
        };

        const handlePicChange = (e) => {
          //const image_url = document.getElementById("myFile").value;
          const image_url = e.target.files[0].name
          console.log(image_url);  
          setImage(image_url);
       };

        const handleExpertiseChange = (e) => {
           const expertise = document.getElementById("expertise").value;
           console.log(expertise);  
           setExpertise(expertise);
        };

        const handleWorkingHours = (e) => {
          const workinghours = document.getElementById("workinghours").value;
          console.log(workinghours);  
          setWorkinghrs(workinghours);
       };

        const updateProfile = (e) => {
          console.log("name:", name,"subject:",expertise,"about_me:", about);
          if(name && expertise && about){
            fetch('http://localhost:3000/api/tutors/'+id, {
            method: "POST",
            headers : { 
              'Content-Type': 'application/json',
               'Accept': 'application/json'
            },
            body: JSON.stringify( {  // you will get user information from login form
              
              "name": name,
              "subject": expertise,
              "about_me": about,
              "working_hours": workinghrs,
              "image_url": image_url,
              "certifications":[],
              "appointments":[]

            } )
          })
          .then( res => res.json() )
          .then( (data) => { 
              console.log(data); 
              alert("profile updated"); 
          })
          .catch((error) => {
            console.log(error.message);
          
          });

          }


          window.location.href='/edit/'+ JSON.parse(localStorage.getItem('user'))._id;
        }
 
       if (isLoading){
         return(
           <div>Loading...</div>
 
         );
 
       }
       else if (error){
         return(
           <div>Error: {error.message }</div>
 
         );
       }
       else{
        
        console.log("tutor setted data after fetch:::",tutors);
        
         return (
          
          <Container>
           <div align="center">
           Name
           <input  type="text"  onChange={handleNameChange} value={name} id="name" style={{  width:"300px",marginTop:"200px",marginLeft:"15px"}}/>
           <br/>
           Subject
           <input  type="text"  onChange={handleExpertiseChange} value={expertise} id="expertise" style={{  width:"300px",marginTop:"10px",marginLeft:"15px"}}/>
           <br/>
           Working Hours
           <input  type="text"  onChange={handleWorkingHours} value={workinghrs} id="workinghours" style={{  width:"300px",marginTop:"10px",marginLeft:"15px"}}/>
           <br/>
           About
           <input  type="text"  onChange={handleAboutChange} value={about} id="about" style={{  width:"300px",marginTop:"10px",marginLeft:"15px"}}/>   
           <br/>
           <br/>
           Update your profile picture
           <br/>
           <input type="file" onChange = {handlePicChange} id="myFile" name="filename"/>
           <br/>
           <br/>

           <button onClick={updateProfile}>Update Profile</button>
           </div>
           
          
           </Container>
         );
       }    
 }

export default UpdateProfile;


/*import { useState } from 'react'
//import { useHistory } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'

function App() {
	//const history = useHistory()
	const [img, setImg] = useState([]);
	const handlePic = (event) => {
		setImg(event.target.files[0].name);
	}
	let [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const [working_hours, setWorkingHours] = useState('')
    const [subject, setSubject] = useState('')
    const [about_me, setAboutMe] = useState('')
	const [profile_pic, setProfilePic] = useState('')
	const [certifications, setCertifications] = useState('')

	async function registerUser(event) {
		event.preventDefault()
		console.log(name, email, password);
		const cert_array = certifications.split(',');
		console.log(certifications, cert_array, img);

		const response = await fetch('http://localhost:3000/new/register_tutor', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"name":name,
				"subject":subject,
				"about_me":about_me,
				"working_hours":working_hours,
				"email":email,
				"password":password,
				"certifications":cert_array,
				"image_url":img
			}),
		})
		//console.log(event.target);
		//event.target.name_form = "";
		const data = await response.json()
		console.log(data);
		if (data.name) {
			console.log(data);
			alert("Registration Successful!");
		} else {
			alert(data.error);
		}
		//document.getElementById('my_form').reset();
		
	}

	return (
		<div>
			<Navbar/>
			<h1 style={{paddingTop:"170px"}}>Register</h1>
			<form id="my_form" onSubmit={registerUser}>
                <br />
				<input
					value={name}
					id = "name_form"
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
				/>
				<br />
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
                <input
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
					type="text"
					placeholder="Subject"
				/>
				<br />
                <input
					value={working_hours}
					onChange={(e) => setWorkingHours(e.target.value)}
					type="text"
					placeholder="Working Hours"
				/>
				<br />
                <textarea
                    value={about_me}
                    onChange={(e) => setAboutMe(e.target.value)}
					placeholder="Describe yourself.."
                />
				<br />
				<textarea
                    value={certifications}
                    onChange={(e) => setCertifications(e.target.value)}
					placeholder="Certifications"
                />
				<p> Upload your profile picture </p>
                <input 
					onChange = {handlePic}
					type="file"
					id="myFile"
					name="filename"
				/>
                <br />
                <br />
				<input type="submit" value="Register" />
			</form>
			<p style={{paddingTop:"300px"}}></p>
			<Footer/>
		</div>
	)
}

export default App*/
