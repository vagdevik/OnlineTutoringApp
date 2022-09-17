import { useParams } from "react-router-dom";
import {useLocation} from "react-router-dom";
import React, { useState,useEffect } from 'react';
import Calendar from 'react-calendar';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';

const Dashboard = () => {
  const { id } = useParams();
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ iddddddd:", id);
  const location = useLocation();

  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [expertise, setExpertise] = useState([]);
  const [about, setAbout] = useState([]);
  const [image_url, setImage] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [isLoadingTutor, setLoadingTutor] = useState(false);
  const [isLoadingAppoints, setLoadingAppoints] = useState(false);
  const [workinghrs, setWorkinghrs] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');


  useEffect( () => {
 
         setLoadingTutor(true);
         fetch('http://localhost:3000/api/tutors/'+id, {
           headers : { 
             'Content-Type': 'application/json',
              'Accept': 'application/json'
           }
         })
         .then( res => res.json() )
         .then( (data) => { 
             //console.log("data fetched:::",data);
             setTutors(data[0]);
             setName(data[0].name);
             setAbout(data[0].about_me);
             setExpertise(data[0].subject);
             setImage(data[0].image_url);
             setWorkinghrs(data[0].working_hours);
             setLoadingTutor(false);
         })
         .catch((error) => {
           console.log(error.message);
           setError(error);
           setLoadingTutor(false);
 
         });

         setLoadingAppoints(true);
         fetch('http://localhost:3000/appointments1/'+id, {

           headers : { 
             'Content-Type': 'application/json',
              'Accept': 'application/json'
           }
         })
         .then( res => res.json() )
         .then( (data) => { 
             console.log("data fetched:::",data);
             setAppointments(data);
             setLoadingTutor(false);

        
         })
         .catch((error) => {
           console.log(error.message);
           setError(error);
           setLoadingTutor(false);
         });

        


       }, []);


useEffect( () => {
  
  if(appointments.length>0){
    console.log("hoursWorked",hoursWorked());
    let h = hoursWorked();
    document.getElementById("hrs_worked").innerHTML = h;
  }

});


      const isInThePast = (date) => {
        const today = new Date();     
        if( date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)){
          return 1;
        }
        return 0;
      }


console.log("check:",isInThePast(new Date('5-12-2022')));


        const hoursWorked = () => {
          let count = 0;
          for(let i=0; i < appointments.length; i++)
          {
            let r = isInThePast(new Date(appointments[i].date));
            console.log("date check result:", r);
            
            count = count + r;         
          }
          return count;
        };

      
       if (isLoadingTutor){
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
        




        console.log("appointments:::",appointments);


        let newapt = [];
        for (let i = 0; i < appointments.length; i++) {
            if (!isInThePast(new Date(appointments[i].date)) ){
              newapt.push(appointments[i]);
            }
        }
        console.log("newwww"+ newapt);

        
         return (
          <div>
          <container>
         <Row >
           <div align="center">
             <div style={{ marginTop:"200px",marginBottom: "80px" 
  }}>
      <div className="tutorPage">

      
      <i class="fa fa-tasks" aria-hidden="true" ><b> Total Hours Worked </b></i>
      <p id="hrs_worked"></p>

      <br/>
      <i className="fa fa-clock-o" aria-hidden="true"><b> Appointments</b></i>
      <br/> 
      <div align="center">
        <table style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
      {
        
        newapt.map((c) => (
         <tr style={{"borderWidth":"1px", padding: "15px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}} key={c.user}>
         <td style={{"borderWidth":"1px", padding: "15px",'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>{c.date}</td> 
         <td style={{"borderWidth":"1px", padding: "15px",'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>{c.time}</td>
         <td style={{"borderWidth":"1px",padding: "15px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>{c.userID}</td>
         </tr>
        ))
      }
      </table>
      </div>

      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
        <br></br>
          <div className="row">
            <div className="col-sm-4">
            


              </div>
            <div className="col-sm-4">
             
            </div>
            <div className="col-sm-4">
            </div>
            <div class="form-outline">
</div>



          </div>
        </div>
      </div>
      <div className="col-sm-4"></div>
      </div>
        <div className= "row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            

  
            </div>
     <div className="col-sm-3"></div>
        <div/>
        <div className= "row">
       
        </div>
        </div>
   
    </div>
           </div>
           </Row>
           
          </container>
        </div> 
         );
       }    
 }

export default Dashboard;
