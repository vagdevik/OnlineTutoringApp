import React from 'react'
import { Link } from 'react-router-dom';
import {
	 Container, Row, Col
  } from 'reactstrap';

  import "./main.css";
  import "./validate.css";


const Welcome = (props) => {

	return (
		<div style={{paddingTop:"100px"}}>
		<p ></p>
				<table>
					<tr>
						<td>
						<center>
							<h1 class="display-3">Learn and Grow without bounds</h1>
			                <p class="lead">Start Today.. Learn new skills with our world class courses.</p>
			                <div >
			                	<p>There is always something new learn if you are willing to</p>
			                </div>
			            </center>
						</td>
						<td>
							<img class="d-block w-100" src="tut1.jpeg" alt="First slide"/>
						</td>

					</tr>
				</table>
		</div>

		)
	  
};

export default Welcome;