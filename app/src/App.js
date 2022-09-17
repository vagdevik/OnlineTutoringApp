import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom'
import Tutors from './TutorsList';
import Home from './Home';
import TutorDetails from './TutorDetails';
import UpdateProfile from './UpdateProfile';
import Dashboard from './Dashboard';
import UserDashboard from './UserDashboard';
import Navbar from './Navbar'; 
import Footer from './Footer';
import Welcome from './Welcome';
import Register from './pages/Register'
import Login from './pages/Login'
import Tutor_Register from './pages/Tutor_Register'
import {
  Container, Row, Col
 } from 'reactstrap';





class App extends Component {




  
      render () {
         return (
          <Router>
            <div className="App">
           <Navbar/>
          
           <Switch>
           <Route path="/welcome" element={<Welcome />} /> 
                <Route path="/" element={<Home />} /> 
                <Route path="/tutors/:id" element={<TutorDetails />} /> 
                <Route path="/edit/:id" element={<UpdateProfile />} />
                <Route path="/userdashboard/:id" element={<UserDashboard />} /> 
                <Route path="/dashboard/:id" element={<Dashboard />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/tutor_register" element={<Tutor_Register />} />
              </Switch>
            
            
            <Footer />
          
            </div>
          </Router>
        );
 
      }
}

export default App;