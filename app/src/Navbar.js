import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './pages/Login';
import { editableInputTypes } from '@testing-library/user-event/dist/utils';

const Navbar = () => {

  const user_info = JSON.parse(localStorage.getItem('user'));
  console.log("ls info"+user_info);
  console.log("ls info"+user_info._id);

  if(user_info.type==0)
	return (
		<div>
		<nav class="navbar navbar-expand-sm navbar-light bg-dark fixed-top bar1 navbar-custom"> 
            <button type="button" data-bs-toggle="collapse" data-bs-target="#firstNav" 
            class = "navbar-toggler" aria-controls = "firstNav" aria-expanded = "false" aria-label="Toggle Navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="firstNav">
             <ul class="navbar-nav ms-auto">
             <li class="nav-item active"><Link to={`/login`}>  <p>LogIn</p></Link></li>  &nbsp;  
             
              <li class="nav-item active"><Link to={`/register`}> <p>Register</p></Link></li>
            	
            </ul>            
          </div>
        </nav>

        <nav class="bar2 navbar navbar-expand-lg navbar-light py-4 fixed-top" style={{marginTop:"50px",paddingBottom:"10px",background:"#ff6347",color:"blue"}}>
          <div class="container">
          <Link to={`/welcome`}><img class="d-inline-block align-top" src="graduation-cap.png" width="40" height="40" style={{marginTop:"15px"}}/><font color="white" size="25"> TutMe</font></Link>

            <button type="button" data-bs-toggle="collapse" data-bs-target="#secondNav" 
            class = "navbar-toggler" aria-controls = "secondNav" aria-expanded = "false" aria-label="Toggle Navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="secondNav">
              <ul class="navbar-nav">
              <li class="nav-item" style={{fontSize:"25px", marginTop:"12px",marginLeft:"15px"}}> <Link to={`/`}>   TUTORS </Link></li>
              <li class="nav-item" style={{fontSize:"25px", marginTop:"12px",marginLeft:"15px"}}> <Link to={`/UserDashboard/`+user_info._id}>   PROGRESS </Link></li>
				
              </ul>
			</div>
			</div>

      

         
        </nav>
      </div>
    
	);
else
{

  return (
		<div>
		<nav class="navbar navbar-expand-sm navbar-light bg-dark fixed-top bar1 navbar-custom"> 
            <button type="button" data-bs-toggle="collapse" data-bs-target="#firstNav" 
            class = "navbar-toggler" aria-controls = "firstNav" aria-expanded = "false" aria-label="Toggle Navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="firstNav">
             <ul class="navbar-nav ms-auto">
             <li class="nav-item active"><Link to={`/login`}> <p>LogIn</p></Link></li> &nbsp; 
              <li class="nav-item active"><Link to={`/register`}> <p>Register</p></Link></li>
            	
            </ul>            
          </div>
        </nav>

        <nav class="bar2 navbar navbar-expand-lg navbar-light py-4 fixed-top" style={{marginTop:"50px",paddingBottom:"10px",background:"#ff6347",color:"blue"}}>
          <div class="container">
            <a href="part1.html" class="navbar-brand h1"><img class="d-inline-block align-top" src="graduation-cap.png" width="40" height="40" style={{marginTop:"15px"}}/><font color="white" size="25"> TutMe</font></a>

            <button type="button" data-bs-toggle="collapse" data-bs-target="#secondNav" 
            class = "navbar-toggler" aria-controls = "secondNav" aria-expanded = "false" aria-label="Toggle Navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="secondNav">
              <ul class="navbar-nav">
              <li class="nav-item" style={{fontSize:"25px", marginTop:"12px",marginLeft:"15px"}}> <Link to={`/edit/`+user_info._id}> PROFILE </Link></li>
              <li class="nav-item" style={{fontSize:"25px", marginTop:"12px",marginLeft:"15px"}}> <Link to={`/Dashboard/`+user_info._id}>   PROGRESS </Link></li>
				
              </ul>
			</div>
			</div>

      

         
        </nav>
      </div>
    
	);




}



}

export default Navbar;