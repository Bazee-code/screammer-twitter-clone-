import React from 'react';
import {Link} from 'react-router-dom';
import {AiOutlineHome} from 'react-icons/ai';
import {MdNotificationsNone} from 'react-icons/md';
import {WiMoonAltFirstQuarter} from 'react-icons/wi';
import {createGlobalStyle} from 'styled-components';
// REDUX
import {connect} from 'react-redux';
import PostScream from './postscream.js';

class navbar extends React.Component {
	render() {
		const {user:{authenticated}} = this.props;
		const {handleDarkmode} = this.props;
		console.log(handleDarkmode);
		return (
			<nav className="navbar navbar-expand-md py-3 navbar-dark bg-info">
				<Link to="/" className="navbar-brand">Screammer</Link>

				<button className="navbar-toggler" data-toggle="collapse" 
				data-target="#navBarNav">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navBarNav">
					<ul className="navbar-nav mx-auto">
					
					{authenticated ? (
						<React.Fragment>
						
							<PostScream />
						
						<Link to="/" className="nav-item nav-link">
							<button className="btn btn-sm btn-light"><AiOutlineHome /></button>
						</Link>
						<Link to="/" className="nav-item nav-link">
							<button className="btn btn-sm btn-light "><MdNotificationsNone /></button>
						</Link>
						<Link className="nav-item nav-link ml-5">
						<button className="btn btn-sm btn-info btn-outline-dark" data-toggle="tooltip" 
						data-placement="right" title="Dark mode" 
						onClick={handleDarkmode}><WiMoonAltFirstQuarter/></button>
						</Link>
						</React.Fragment>
						) : 
						(
							<React.Fragment>
							<Link to="/login" className="nav-item nav-link">Login</Link>
							<Link to="/signup" className="nav-item nav-link">Signup</Link>
							</React.Fragment>
						)}
					</ul>
				</div>
			</nav>
		)
	}
}

const mapStateToProps = (state)=>({
	user : state.user
});

export default connect(mapStateToProps)(navbar);