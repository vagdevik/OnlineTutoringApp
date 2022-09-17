import React from 'react'
import { Link } from 'react-router-dom';
import {
	 Container, Row, Col
  } from 'reactstrap';

const available_appointments = (props) => {



    var select = document.getElementById("select");

    arr = ["html","css","java","javascript","php","c++","node.js","ASP","JSP","SQL"];
    //arr= [];
for(var i = 0; i < arr.length; i++)
{

var option = document.createElement("OPTION"),
    txt = document.createTextNode(arr[i]);
option.appendChild(txt);
option.setAttribute("value",arr[i]);
select.insertBefore(option,select.lastChild);
}




	return (
		<div>
	    <select id="select">
        <option value="default">default</option>
    </select>


		</div>
	  )
	  







};

export default Tutors;