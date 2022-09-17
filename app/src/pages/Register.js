import { useState } from 'react'
//import { useHistory } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Tutor_Register from './Tutor_Register'
import { Link } from 'react-router-dom';

function App() {
	//const history = useHistory()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()
		console.log(name, email, password);
		const response = await fetch('http://localhost:3000/new/register', {
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
	}

	return (
		<div>
			<Navbar/>
			<center>
			<h1 style={{paddingTop:"170px"}}>Register</h1>
			<br/>
			
			<form onSubmit={registerUser}>
				<Link to={`/tutor_register`}>
					<button>Click here to register as tutor</button>
            	</Link>
				<br/><br/><br/>
				<input
					value={name}
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
				<br /> <br/>
				<input type="submit" value="Register" />
			</form>
			<p>email format: [prefix]@[domain_part1].[domain_part2]</p>
			<p>password format: minimum 6 characters length, 1 special character, 1 capital letter, 1 number</p>
			</center>
			<p style={{paddingTop:"300px"}}></p>


			<Footer/>
		</div>
	)
}

export default App
