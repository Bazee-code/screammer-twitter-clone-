import React from 'react';
import {Link} from 'react-router-dom';
import {AiOutlineUpload,AiOutlineEdit} from 'react-icons/ai';
import {GiEarthAfricaEurope} from 'react-icons/gi';
import {GoLocation} from 'react-icons/go';
// REDUX
import {connect} from 'react-redux';
import {logoutUser,uploadImage} from './redux/actions/userActions.js';

// local
import EditDetails from './editdetails.js';

class profile extends React.Component {
	handleImageChange =(e)=>{
		const image = e.target.files[0]
		// send file chosen to server
		const formData = new FormData();
		formData.append(`image`,image,image.name);

		this.props.uploadImage(formData);
	};

	handleEditPicture = ()=>{
		const fileInput = document.getElementById('imageUpload');
		fileInput.click();
	};

	handleSubmit =(e)=>{
		e.preventDefault();

		this.props.logoutUser();
	};
	render() {
		const {user:{credentials:{handle,createdAt,imageUrl,bio,
			website,location},loading,authenticated}} = this.props;
		// console.log(handle);
		// const {UI} = this.props;
		// console.log(UI);
		const imgStyle ={
			height :"200px",
			width : "200px"
		};
		let profileMarkup = !loading ? (authenticated ?(
			<div className="card-body text-center">
				<img src={imageUrl} className="img-thumbnail" style={imgStyle}/>
				<div>
				<button className="btn btn-sm btn-outline-info" onClick={this.handleEditPicture}
				data-toggle="tooltip" data-placement="right" title="change profile picture">
				 <AiOutlineUpload /><input type="file" hidden="hidden" id="imageUpload"onChange={this.handleImageChange}/>
				</button>
				</div>
				<h5 className="text-info mt-2">{handle}</h5>
				<p><AiOutlineEdit />{bio}</p>
				<p><GoLocation />{location}</p>
				<p><GiEarthAfricaEurope /><Link to={website}>{website}</Link></p>
				<EditDetails />
				<form onSubmit={this.handleSubmit}>
				<button className="btn btn-danger" type="submit">LOGOUT</button>
				</form>
			</div>):(
			<div className="mt-3">
			<p><small className="text-info m-4">Don't have an account?<Link to="/signup">Signup</Link></small></p>
			<p><small className="text-info m-4">Already have an account?<Link to="/login">Login</Link></small></p>
			</div>
			)) :<p>Loading...</p> 
		return (
			<React.Fragment>
				{profileMarkup}
			</React.Fragment>
		)
	}
}

const mapStateToProps =(state)=>({
	// gives us access to data in our reducer
	user : state.user
	// UI : state.UI
});

const mapActionsToProps = {
	logoutUser,
	uploadImage
};

export default connect(mapStateToProps,mapActionsToProps)(profile);