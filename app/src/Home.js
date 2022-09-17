import React, {Component,useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom'
import Tutors from './TutorsList';
import {
  Container, Row, Col
 } from 'reactstrap';


 //import React, {useState, useEffect} from 'react';
 
 
 function Home()  {
  /*
  state = {
    availableOnly: false,
    search:''  
  }
*/
  const [availableOnly, setAvailableOnly] = useState(false);
   const [tutors, setTutors] = useState([]);
   const [error, setError] = useState(null);
   const [search, setSearch] = useState('');
   const [isLoading, setLoading] = useState(false);
 
       // http://localhost:3000/tutors
 
       useEffect( () => {
 
         setLoading(true);
         fetch('http://localhost:3000/api/tutors', {
           headers : { 
             'Content-Type': 'application/json',
              'Accept': 'application/json'
           }
         })
         .then( res => res.json() )
         .then( (data) => { 
             console.log(data);
             setTutors(data);
             setLoading(false);
         })
         .catch((error) => {
           console.log(error.message);
           setError(error);
           setLoading(false);
 
         })
       }, []);
 
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
         return (
          <div>
          <container>
         <Row >
           <div align="center">
           <input  type="text" placeholder="Name, Subject Search" style={{  width:"300px",marginTop:"200px",marginLeft:"15px"}}    onChange={(e)=>{setSearch(e.target.value)}}/>
           </div>
           </Row>
           <br></br>
           <Row  >
          <Tutors tutorsData={tutors}  search={search}/>
          </Row>
          </container>
        </div> 
   
         );
 
       }
      
       
 }
 
 



export default Home;