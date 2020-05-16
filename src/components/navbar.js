import React from 'react';
import {Link} from 'react-router-dom';
import {AiOutlineHome} from 'react-icons/ai';
import {MdNotificationsNone} from 'react-icons/md';
import {FaMoon} from 'react-icons/fa';
// REDUX
import {connect} from 'react-redux';
import PostScream from './postscream.js';



class navbar extends React.Component {
	render() {
		const {user:{authenticated}} = this.props;
		const {theme} = this.props;
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