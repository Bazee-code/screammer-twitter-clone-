import React from 'react';

// REDUX
import {connect} from 'react-redux';
import {editUserDetails} from './redux/actions/userActions.js';

class editdetails extends React.Component {
	constructor(props){
		super(props);

		this.state ={
			bio : "",
			website : "",
			location : "",
			open : false
		};	
	};

	mapUserDetailsToState = ()=>{
		const {user:{credentials}} = this.props;
		this.setState({
			bio: credentials.bio ? credentials.bio : "",
			website : credentials.website ? credentials.website : "",
			location : credentials.location ? credentials.location : ""
		});	
	};
	componentDidMount(){
		const {user:{credentials}} = this.props;
		this.mapUserDetailsToState(credentials);
	};
	handleOpen =()=>{
		this.setState({
			open:true
		});
		this.mapUserDetailsToState(this.props.credentials);
	};
	handleClose =()=>{
		this.setState({
			open:false
		});
	};
	
	handleChange =(e)=>{
		this.setState({
			[e.target.name] : e.target.value
		});
	};
	handleSubmit = ()=>{
		const userDetails = {
			bio : this.state.bio,
			website : this.state.website,
			location : this.state.location
		};

		this.props.editUserDetails(userDetails);
		this.handleClose();
	};
	
	render() {
		return (
			<React.Fragment>
			<button className="btn btn-sm btn-info mb-2" data-toggle="modal"
			data-target="#editdetails" onClick={this.handleOpen}>Edit details</button>
					<div className="modal"  role="dialog" id="editdetails">
					  <div className="modal-dialog" role="document">
					    <div className="modal-content">
					      <div className="modal-header">
					        <h5 className="modal-title">Edit your details below</h5>
					        <button type="button" className="close" data-dismiss="modal" 
					        onClick={this.handleClose}aria-label="Close">
					          <span aria-hidden="true">&times;</span>
					        </button>
					      </div>
					      <div className="modal-body">
					        <form>
					        	<input type="text" name="bio" 
					        	placeholder={this.state.bio ? this.state.bio :"A short bio about yourself"}
					        	className="form-control m-2" onChange={this.handleChange}/>
					        	<input type="text" name="website"
					        	placeholder={this.state.website ? this.state.website : "Your personal/professional website"}
					        	className="form-control m-2" onChange={this.handleChange}/>
					        	<input type="text" name="location" placeholder={this.state.location ? this.state.location : "Where do you live?"}
					        	className="form-control m-2" onChange={this.handleChange}/>
					        </form>
					      </div>
					      <div className="modal-footer">
					        <button type="button" className="btn btn-sm btn-warning"
					        onClick={this.handleSubmit} data-dismiss="modal">Save changes</button>
					      </div>
					    </div>
					  </div>
					</div>
				
			</React.Fragment>
		)
	}
}

const mapStateToProps =(state)=>({
	user : state.user
});

const mapActionsToProps = {
	editUserDetails
};

export default connect(mapStateToProps,mapActionsToProps)(editdetails);