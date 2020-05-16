import React from 'react';
import {GrFormAdd} from 'react-icons/gr';

// REDUX
import {connect} from 'react-redux';
import {addComment} from './redux/actions/dataActions.js';

class addcomment extends React.Component {
	constructor(props){
		super(props);

		this.state ={
			body : '',
			open : false
		};
	}

	handleOpen =()=>{
		this.setState({
			open : true
		});
	};

	handleClose = ()=>{
		this.setState({
			open : false
		});
	};

	handleChange =(e)=>{
		this.setState({
			[e.target.name] : e.target.value
		});
	};

	handleSubmit =(e)=>{
		e.preventDefault();

		const commentData ={
			body : this.state.body
		};

		this.props.addComment(this.props.screamId,commentData);
		this.handleClose();
	};
	render() {
		const inputStyle ={
			borderTop : "none",
			borderLeft : "none",
			borderRight : "none"
		};
		return (
			<React.Fragment>
				<button className="btn btn-sm" data-toggle="modal" 
				data-target="#addComment" onClick={this.handleOpen}>
					<small className="text-info">Click to add comment</small><GrFormAdd />
				</button>
				<div className="modal" role="dialog" id="addComment">
				  <div className="modal-dialog modal-dialog-centered" role="document"
				  style={{opacity:"0.9"}} >
				    <div className="modal-content bg-outline-info">
				      <div className="modal-header">
				        <h5 className="modal-title text-info">Add Comment</h5>
				        <button type="button" className="close" data-dismiss="modal"
				         aria-label="Close" onClick={this.handleClose}>
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div className="modal-body ">
			        	<input className="form-control" name="body" value={this.state.body}
			        	onChange = {this.handleChange} style={inputStyle} placeholder="Type here"/>
				      </div>
				      <div className="modal-footer">
				        <button type="submit" className="btn btn-sm btn-info" 
				        data-dismiss="modal" onClick={this.handleSubmit}>
				        	Submit comment
				        </button>
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
	addComment
};

export default connect(mapStateToProps,mapActionsToProps)(addcomment);