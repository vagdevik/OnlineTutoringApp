import { useState } from 'react'
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

    /*async function registerTutor(event) {
		event.preventDefault()
		console.log(name, email, password);
		const response = await fetch('http://localhost:3000/register_tutor', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"name":name,
				"email":email,
				"password":password,
			}),
		})

		const data = await response.json()
		console.log(data);
		if (data.username) {
			console.log(data);
			alert("Registration Successful!");
		} else {
			alert(data.error);
		}
	}*/

	return (
		<div>
			<Navbar/>
			<center>
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
			</center>
			<Footer/>
		</div>
	)
}

export default App
