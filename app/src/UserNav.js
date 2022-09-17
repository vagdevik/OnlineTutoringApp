import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserNav = () => {
	return (
		<div>
		<nav class="bar2 navbar navbar-expand-lg navbar-light py-4 fixed-top" style={{marginTop:"50px",paddingBottom:"10px",background:"#ff6347",color:"blue"}}>
          <div class="container">
            <a href="part1.html" class="navbar-brand h1"><img class="d-inline-block align-top" src="graduation-cap.png"  style={{marginTop:"15px"}}/><font color="white" size="25"> TutMe</font></a>

            <button type="button" data-bs-toggle="collapse" data-bs-target="#secondNav" 
            class = "navbar-toggler" aria-controls = "secondNav" aria-expanded = "false" aria-label="Toggle Navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="secondNav">
              <ul class="navbar-nav">
                <li class="nav-item"><a href="tutors.html" class="nav-link" style={{fontSize:"25px", marginTop:"12px",marginLeft:"15px"}}>TUTORS</a></li>
                <li class="nav-item"><a href="courses.html" class="nav-link" style={{fontSize:"25px", marginTop:"12px",marginLeft:"15px"}}>COURSES</a></li>
          <li class="nav-item"><a href="progress.html" class="nav-link" style={{fontSize:"25px", marginTop:"12px",marginLeft:"15px"}}>PROGRESS</a></li>
              </ul>
      </div>
      </div>

      

         
        </nav>
    </div>
  );
}

export default UserNav;