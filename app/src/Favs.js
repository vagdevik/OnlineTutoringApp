import React, {Component, useState, useEffect} from 'react';


class FavTutor extends Component{
	constructor(){
		super();
	
		this.state={
			data: [],
		}

	}


	
	render(){
		return(
			<div>
				<button type="button" className="btn btn-light alignCenter" onClick={()=>this.doWishList()}>
			         <i className="fa fa-heart-o" aria-hidden="true"></i>
			    </button> 
			    <p>Add to favorites</p>  
			</div>
		
		)
	}
}

export default FavTutor;







