import { useParams } from "react-router-dom";
import {useLocation} from "react-router-dom";
import React, { useState,useEffect } from 'react';
import Calendar from 'react-calendar';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
const TutorDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  //console.log(location.state);

  const image_style = {
    height: 200,
    width: 200,
  };
  const [time, setTimes] = useState();
  const [appt, setApp] = useState("");
  const [fav, setFav] = useState("");
  const [rtg, setRate] = useState("");
  const [cmt, setCmt] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  
let currentDate="";


useEffect(() => {
  getFav();
  getAppts();
}, []);




  useEffect(() => {
   
    currentDate = startDate.toLocaleDateString().replaceAll("/","-");
   updateAvailApts();
 //enableBookBtn();
  });




  function favTutor()
  {

    alert("added tutor to favourites");
    let isfav = 0;

    
                 if(fav.length > 0)
                 {
                 
                   
                   let fav_len=  fav.length ;
                   
                   for(let i=0; i < fav_len; i++)
                   {   
                
                     if(fav[i].tutorID==id && fav[i].userID==JSON.parse(localStorage.getItem('user'))._id) 
                         {  isfav = 1;
                           console.log(" is fav - 1"+ isfav);
                         
                          // document.getElementById('favbtn').ariaHidden= false;
                 
                         }
                    }
                 }
                    
                

                console.log(" is fav 2"+ isfav);

    if(isfav==0)
    {
      console.log("printing user id "+ JSON.parse(localStorage.getItem('user'))._id +"  tutor id"+id);
      fetch('http://localhost:3000/favourites', {
        method: "POST",
        headers : { 
          'Content-Type': 'application/json',
           'Accept': 'application/json'
        },
        body: JSON.stringify( {  // you will get user information from login form

          "userID": JSON.parse(localStorage.getItem('user'))._id ,
        
          "tutorID": id,
          "tutorName": location.state.name

        } )
      })
      .then( res => res.json() )
      .then( (data) => { 
        getFav();
          console.log("adding"+ data);    
      })
      .catch((error) => {
        console.log(error.message);
      
      });  



     


    }



     //post fav into database
  }




  function getFav(){
    //fetch appointments 

    console.log("fetch fav");
    fetch('http://localhost:3000/favourites', {
               headers : { 
                 'Content-Type': 'application/json',
                  'Accept': 'application/json'
               }
             })
             .then( res => res.json() )
             .then( (data) => { 
                 console.log(data);
                 setFav(data);
    
                 if(data.length > 0)
                 {
                 
                   
                   let fav_len=  data.length ;
                   
                   for(let i=0; i < fav_len; i++)
                   {  
                     if(data[i].tutorID==id && data[i].userID==JSON.parse(localStorage.getItem('user'))._id) 
                         {  // isfav = true;
                           //console.log(" is fav"+isfav);
                         
                           document.getElementById('favbtn').ariaHidden= false;
                 
                         }
                    }
                 }
                    
                 
             })
             .catch((error) => {
               console.log(error.message);
                })
    

}







function getAppts(){
  console.log("fetch appts");
//fetch appointments 
fetch('http://localhost:3000/appointments', {
           headers : { 
             'Content-Type': 'application/json',
              'Accept': 'application/json'
           }
         })
         .then( res => res.json() )
         .then( (data) => { 
             console.log(data);
             setApp(data);

             
             
         })
         .catch((error) => {
           console.log(error.message);
            })

         

}



  function bookAppointment() {

    var select = document.getElementById("select");
      console.log("Booked for ID- "+ id + "Day:"+  currentDate + "Time: " + select.options[select.selectedIndex].textContent);
      const user_info = JSON.parse(localStorage.getItem('user'));
      console.log(user_info);
      fetch('http://localhost:3000/appointments', {
        method: "POST",
        headers : { 
          'Content-Type': 'application/json',
           'Accept': 'application/json'
        },
        body: JSON.stringify( {  // you will get user information from login form

          "userID": user_info._id,
          "tutorName": location.state.name, 
          "tutorID": id,
          "date": currentDate,
          "time": select.options[select.selectedIndex].textContent


        } )
      })
      .then( res => res.json() )
      .then( (data) => { 
          console.log(data);    
          alert("Booked for day: "+  currentDate + "   Time: " + select.options[select.selectedIndex].textContent);
          window.location.href= '/';
      })
      .catch((error) => {
        console.log(error.message);
      
      });




  }


  function updateAvailApts(e) {
     
           const res1 = [];
           const res2 = [];
   
if(appt.length > 0)
{

  
  let ap_len=  appt.length ;
  
  for(let i=0; i < ap_len; i++)
  {  if(appt[i].tutorID==id) 
        {
          if(appt[i].date==currentDate)
          {
            res2.push(appt[i].time);
            //console.log("apt not avail at"+ appt[i].time );
          }

        }
   }
}


     
   
      
	let working_hours = location.state.working_hours;
  //console.log(working_hours);
    let temp = working_hours.split("-");
       

	let avail_app= [];
    let start  =  temp[0].substring(0, 2);
	let end  =  temp[1].substring(0, 2);
  //console.log("start  "+ start+"end"+end);
	let time= parseInt(start);
	if(temp[0].includes("AM"))
	{   while(time < 12 && temp[1].includes("PM"))
		{
		if( !res2.includes(time+"AM"))
		   avail_app.push(time+"AM");

        time= time+1;

		}
		
		if(time == 12 && temp[1].includes("PM") && end!= 12)
		{
		if( !res2.includes(time+"PM"))
		   avail_app.push("12PM");

        

		}
		time= 1;
		while(temp[1].includes("PM") &&  time < end  && end!= 12)
		{
		if( !res2.includes(time+"PM"))
		   avail_app.push(time+"PM");

        time= time+1;

		}

	}
		

	if(temp[0].includes("PM"))
	{  
		if(time == 12 && temp[1].includes("PM") && end!= 12)
		{
		if( !res2.includes(time+"PM"))
		   avail_app.push("12PM");

        }
		time= 1;
		while(temp[1].includes("PM") &&  time < end  && end!= 12)
		{
		if( !res2.includes(time+"PM"))
		   avail_app.push(time+"PM");

        time= time+1;

		}

	}	

var select = document.getElementById("select");
  

select.innerHTML = '';
  
  for(var i = 0; i < avail_app.length; i++)
{
    var option = document.createElement("option");
    option.textContent = avail_app[i];
    option.value = option;
   
    select.appendChild(option);
  }






    




    //setName(e.target.value);
  }


   function rateTutor()
  {


  
  }

  function commentTutor()
  {
  
  }

  


  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRate(newRating);
     //post latest rating into database
  };


  const commentChanged = (newcomment) => {
    console.log(document.getElementById("comment").value);
    setCmt(document.getElementById("comment").value);
    //post latest comment into database
  };

  const PostFeedback = (newcomment) => {
   alert("posting feedback rating- "+ rtg +"   comment   "+ cmt);
    //post latest comment into database
  };



  return (
    <div style={{ marginTop:"200px",marginBottom: "80px" 
  }}>
      <div className="tutorPage">
      <img src={"/images/"+location.state.image_url} alt="mentor_1" style={image_style}></img>

    
      <h2>{location.state.name}</h2>
      <p>{location.state.rating}<i className="fa fa-star" aria-hidden="true"></i></p>

      <i className="fa fa-book" ><b> Expertise </b></i>
      <p>{location.state.subject}</p>
      
      <i class="fa fa-user" aria-hidden="true"><b> About Me </b></i>
      <p>{location.state.about_me}</p>

      <i className="fa fa-certificate" aria-hidden="true"><b> Certifications</b></i>
    
        
      {
        location.state.certifications.map(function(c){
          return <p> {c} </p>
        })
      }
      
<br></br>






      <i class="fa fa-clock-o" aria-hidden="true"><b> Working Hours</b></i>
      <p>{location.state.working_hours}</p>
      <span id="rateMe4"  class="feedback"></span>
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
        <br></br>
          <div className="row">
            <div className="col-sm-4">
            
              
      <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  />
 

              <p>Rate the Tutor</p>
            </div>
            <div className="col-sm-4">
             
            </div>
            <div className="col-sm-4">
              <button type="button" id="favbtn" className="btn btn-light alignCenter" onClick={favTutor}>
                <i className="fa fa-heart-o" ></i>
              </button> 
              <p>Add to favorites</p>
              
              
            </div>
            <div class="form-outline">
  <textarea class="form-control" id="comment" rows="2" onChange={commentChanged}></textarea>
  <button type="button" id="feedback" className="btn btn-primary alignCenter" onClick={PostFeedback}>Submit</button>

</div>

          </div>
        </div>
      </div>
      <div className="col-sm-4"></div>
      </div>
        <div className= "row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <Calendar  style={{height:"300px", width:"500px"}}  onClickDay={(date) => setStartDate(date)}  selected={startDate} onChange={ updateAvailApts}
            />

<br>
    </br>
    <br>
    </br>
    <br>
    </br>
<select id="select"  className="alignCenter"  style={{width: "200px"}}   >
       
    </select>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
  
    <button type="button" id="Book_Appointment"className="btn btn-primary alignCenter" onClick={bookAppointment} >Book Appointment</button>
            </div>
     <div className="col-sm-3"></div>
        <div/>
        <div className= "row">
       
        </div>
        </div>
   
    </div>
  );
}






export default TutorDetails;