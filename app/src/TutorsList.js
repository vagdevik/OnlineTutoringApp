import React from 'react'
import { Link } from 'react-router-dom';
import {
	 Container, Row, Col
  } from 'reactstrap';

const Tutors = (props) => {

	const user_info = JSON.parse(localStorage.getItem('user'));
	

	return (
		<div>
			 <Container 
style={{ marginBottom: "80px" 
}}
 >
				<Row xs={3}>
				{props.tutorsData.filter((tutor)=> ((tutor.name.toLowerCase().includes(props.search.toLowerCase())) || tutor.subject.toLowerCase().includes(props.search.toLowerCase()))).map((tutor) => (
				
				   
					  <Col >
						  <div className ="card" key={tutor._id} >
					<div className ="card-body" key={tutor._id}>
						<img className="card-img-top"  src={"/images/"+tutor.image_url} alt="Card image" style={{width:300, height:200}}/>
						<h3 className="card-title">{tutor.name}</h3>
						<h6 className="card-subtitle mb-2 text-muted">{tutor.rating} <i className="fa fa-star"></i> </h6>
						<h6 className="card-subtitle mb-2 text-muted">{tutor.subject}</h6>
						<p className="card-text">{tutor.about_me}</p>
						<Link to={`/tutors/${tutor._id}`} state={tutor}>
							<p>View More</p>
						</Link>
					</div>
				</div>
					  </Col>
					
				))}
				</Row>
			</Container>
		</div>
	  )
	  







};

export default Tutors;