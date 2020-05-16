import React from 'react';
import {AiOutlineMore} from 'react-icons/ai';
import moment from 'moment';

// REDUX
import {connect} from 'react-redux';
import {getScream} from './redux/actions/dataActions.js';

// local
import ScreamComments from './screamcomments.js'; 
import AddComment from './addcomment.js';

class screamDialog extends React.Component {
	constructor(props){
		super(props);

		this.state ={
		open: false
		};
	};

	handleClose =()=>{
		this.setState({
			open : false
		});
	};

	handleOpen = ()=>{
		this.setState({
			open: true
		});
		this.props.getScream(this.props.screamId);
	};

	render() {
		const {data:{scream:{likeCount,commentCount,userHandle,createdAt,
			userImage,comments,screamId}}} = this.props;
		// console.log(scream);
		const {data:{scream}} = this.props;
		// console.log(scream);
		const imgStyle ={
			height : "200px",
			width : "200px"
		};
		let commentSections = commentCount === 0 ? 
		<small className="text-muted">Currently no comments on scream</small>
				 : <ScreamComments comments={comments} />
		return (
			<React.Fragment>
			<button className="btn btn-sm btn-outline-info" data-target="#screamDetails"
				data-toggle="modal" onClick={this.handleOpen}><AiOutlineMore /></button>
				<div className="modal" role="dialog" id="screamDetails">
				  <div className="modal-dialog modal-dialog-centered" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title text-info">Scream Details</h5>
				        <button type="button" className="close" data-dismiss="modal" 
				        aria-label="Close" onClick={this.handleClose}>
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div className="modal-body text-center">
				        <img src={userImage} className="img-fluid" style={imgStyle}/>
				        <p className="text-info mt-2">Posted by : {userHandle}</p>
				       	<p className = "text-muted">Posted at : {moment(createdAt).calendar()}</p>
				        <p>Likes : {likeCount}</p>
				        <p>Comments : {commentCount}</p>
				        {commentSections}
				        <AddComment screamId={screamId}/>
				      </div>
			      </div>
			    </div>
			  </div>
			</React.Fragment>
		)
	}
}

const mapStateToProps =(state)=>({
	data : state.data
});

const mapActionsToProps = {
	getScream
};

export default connect(mapStateToProps,mapActionsToProps)(screamDialog);