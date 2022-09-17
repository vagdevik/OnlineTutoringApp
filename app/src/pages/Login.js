import { useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'

function App() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()
		console.log("sending");
		const response = await fetch('http://localhost:3000/new/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password
			}),
		})
		console.log("waiting");
		const data = await response.json()
		console.log(data);
		if (data._id) {
			console.log(data);
			let inMemoryToken = data.token;
			console.log(inMemoryToken);
			localStorage.setItem('user', JSON.stringify(data));
			console.log("data",data);
			console.log("here-----"+ data._id);
			alert('Login successful')
			if(data.type==0)
			window.location.href = '/UserDashboard/'+data._id;
			else
			window.location.href = '/Dashboard/'+data._id;
		} else {
			alert('Please check your username and password')
		}
	}

	return (
		<div>
			<Navbar/>
			<center>
			<h1 style={{paddingTop:"170px"}}>Login</h1>
			<form onSubmit={loginUser}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
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
				<input type="submit" value="Login" />
			</form>
			<p style={{paddingTop:"300px"}}></p>
			</center>
			<Footer/>
		</div>
	)
}

export default App
