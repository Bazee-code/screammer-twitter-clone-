import React from 'react';
import {MdExpandMore} from 'react-icons/md';

// local
import ScreamComment from './screamcomment.js';

class screamcomments extends React.Component {
	render() {
		const {comments} = this.props;
		// console.log(comments);
		let commentSection = comments === undefined ? <p>No comments </p> 
			:comments.map(comment=>(
				<ScreamComment comment={comment}/>
			));
		return (
			<React.Fragment>
				<div className="accordion" id="accordionExample">
	        <span>
	         <button className="btn btn-sm btn-outline-info" data-toggle="collapse" data-target="#collapseOne">
	         <small className="text-muted">Click to view comments</small><MdExpandMore />
	        </button></span>
				<div id="collapseOne" className="collapse" data-parent="#accordionExample">
			   {commentSection}
			  </div>
				</div>
			</React.Fragment>
		)
	}
}

export default screamcomments;