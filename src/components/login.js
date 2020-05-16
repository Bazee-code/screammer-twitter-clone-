import React from 'react';
import {Link} from 'react-router-dom';
// import axios from 'axios';

// redux
import {connect} from 'react-redux';
import {loginUser} from './redux/actions/userActions.js';

// const proxy = `https://cors-anywhere.herokuapp.com/`;
// const url = `${proxy}https://us-central1-screammer-3df4b.cloudfunctions.net/api`;

class login extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			email:"",
			password :"",
			// loading : false,
			errors : {}
			};
		};

		static getDerivedStateFromProps(nextProps){
			// used to pass the prop values to state values hence updating the state
			if(nextProps.UI.errors){
				return { errors : nextProps.UI.errors};
				// this.setState({
				// 	errors : nextProps.UI.errors
				// })
			}
			else{
				return null;
			}
		};

		componentDidUpdate(prevProps){
			if(prevProps.UI.errors !== this.props.UI.errors){
				this.setState({
					errors : prevProps.UI.errors
				});
			}
		};

		handleSubmit =(e)=>{
			// console.log("Hi from handlesubmit!");
			e.preventDefault(); //prevent default behaviour of reloading page and attaching user info to url
			// this.setState({s
			// 	loading : true
			// });

			const userData ={
				email : this.state.email,
				password : this.state.password
			};

			this.props.loginUser(userData,this.props.history);
			// axios.post(url+'/login',userData)
			// .then((res)=>{
			// 	console.log(res.data); //token is sent back
			// 	// we now want to save our token in our local storage so that when we refresh our page we aren't logged out
			// 	localStorage.setItem(`FBIdToken`,`Bearer ${res.data}`);
			// 	this.setState({
			// 		loading : false
			// 	});
			// 	// redirect user to home page
			// 	this.props.history.push('/'); //we use this to pass state to our url and redirect to it
			// })
			// .catch((e)=>{
			// 	console.log(e.response.data);
			// 	this.setState({
			// 		errors : e.response.data,
			// 		loading : false
			// 	});
			// })
		};

		handleChange =(e)=>{
			this.setState({
				[e.target.name]:e.target.value
			});
		};

	render() {
		const inputStyle ={
			borderTop:"none",
			borderLeft: "none",
			borderRight: "none"
		};
		const {UI:{loading}} = this.props;
		const {errors} = this.state;
		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-4"></div>
					<div className="col-md-4">
					<div className="text-center mt-5">
					<img src="./scream.png" className="img-fluid" 
					style={{height:"80px",width:"80px"}} alt="logo"/>
					</div>
						<div className="card border-info mt-2">
							<div className="card-body">
								<form onSubmit={this.handleSubmit}>
									<label htmlFor="email">Email</label>
									<input className="form-control" type="email" id="email" 
									style={inputStyle} value={this.state.email} name="email"
									onChange={this.handleChange} />
									<p><small id="emailHelp" className="text-danger">{errors.email}</small></p>
									<label htmlFor="password" className="mt-2">Password</label>
									<input className="form-control" type="password" id="password"
									style={inputStyle} value={this.state.password}  name="password"
									onChange={this.handleChange} />
									<small id="emailHelp" className="text-danger">{errors.password}</small>
									<div className="text-center">
										<p><small id="emailHelp" className="text-danger">{errors.code}</small></p>
									<button type="submit" className="btn btn-outline-info mt-3 ">Login</button>
									</div>
								</form>
							</div>
						</div>
						<p className="text-center mt-2"><small>Not a member? Signup <Link to="/signup">here</Link></small></p>
					</div>
					<div className="col-md-4"></div>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps =(state)=>({ //access data in our reducers
	user : state.user,
	UI : state.UI
});

// specify which actions we are using
const mapActionsToProps = {
	loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(login);