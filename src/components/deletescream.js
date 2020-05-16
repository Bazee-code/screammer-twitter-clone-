import React from 'react';
import {AiOutlineDelete} from 'react-icons/ai';
import {Link} from 'react-router-dom';

// REDUX
import {connect} from 'react-redux';
import {deleteScream} from './redux/actions/dataActions.js';

class deletescream extends React.Component {
	constructor(props){
		super(props);

		this.state ={
			open: false
		};
	};

	handleOpen =()=>{
		this.setState({
			open : true
		})
	};

	handleClose = ()=>{
		this.setState({
			open:false
		})
	};

	handleDelete =()=>{
		this.props.deleteScream(this.props.screamId);
		this.setState({
			open : false
		})
	};
	render() {
		return (
			<React.Fragment>
			<button className="btn btn-sm btn-light" data-toggle="modal" data-target="#deleteBtn">
				<AiOutlineDelete />
			</button>
			<div className="modal" role="dialog" id="deleteBtn">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			      <p className="text-dark">Are you sure you want to delete this scream ?</p>
			        	<button type="button" onClick={this.handleClose} className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        
			        <p className="text-dark text-center"><small>Action is NOT reversible</small></p>
			      </div>
			      <div className="modal-footer">
			      	<Link to="/">
			        	<button className="btn btn-sm btn-info" onClick={this.handleClose} data-dismiss="modal">go back</button>
			        </Link>
			        <button className="btn btn-sm btn-warning" onClick={this.handleDelete} data-dismiss="modal">Yes</button>
			      </div>
			    </div>
			  </div>
			</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state)=>({
	data:state.data
});

const mapActionsToProps ={
	deleteScream
};

export default connect(mapStateToProps,mapActionsToProps)(deletescream);