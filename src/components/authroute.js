import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


const AuthRoute = ({component:Component,authenticated,...rest})=>(
	<Route 
		{...rest}
		render = {(props)=>authenticated === true ? <Redirect to="/" />
		:<Component {...props} />}
	/>
);

// AuthRoute.propTypes = {
// 	user : PropTypes.object.isRequired
// };

const mapStateToProps = (state)=>({
	authenticated : state.user.authenticated
});

export default connect(mapStateToProps)(AuthRoute);

// requirements of a private route
// 1 . should have the same API as <route />
// 2 . renders a <route /> and passes all the props to it
// 3 . checks if user is auth,if they are it renders the comp prop
// 4 . if not it redirects user to "/login"