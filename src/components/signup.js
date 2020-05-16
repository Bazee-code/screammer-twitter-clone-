import React from 'react';
// import axios from 'axios';

// REDUX
import {connect} from 'react-redux';
import {signupUser} from './redux/actions/userActions.js';

// const proxy = `https://cors-anywhere.herokuapp.com/`;
// const url = `${proxy}https://us-central1-screammer-3df4b.cloudfunctions.net/api`;

class signup extends React.Component {
	constructor(props){
		super(props);

		this.state={
			email : "",
			password :"",
			confirmPassword : "",
			handle : "",
			// loading : false,
			errors : {}
			};
		};

		// pass prop values to our state hence updating our state
		static getDerivedStateFromProps(nextProps){
			if(nextProps.UI.errors){
				return {errors : nextProps.UI.errors}
			}
			else{
				return null;
			}
		};

		// we now update our state
		componentDidUpdate(prevProps){
			if(prevProps.UI.errors !== this.props.UI.errors){
				this.setState({
					errors : prevProps.UI.errors
				})
			}
		};


		handleSubmit =(e)=>{
			e.preventDefault();
			// this.setState({
			// 	loading : true
			// });

			const newuserData = {
				email : this.state.email,
				password : this.state.password,
				confirmPassword : this.state.confirmPassword,
				handle : this.state.handle
			};

			this.props.signupUser(newuserData,this.props.history);
			// axios.post(url+'/signup',newuserData)
			// .then((res)=>{
			// 	console.log(res.data); //get back auth token
			// 	// store token in local storage in browser
			// 	localStorage.setItem(`FBIdToken`,`Bearer ${res.data.token}`);
			// 	this.setState({
			// 		loading : false
			// 	});
			// 	// redirect user to home page
			// 	this.props.history.push("/");
			// })
			// .catch((e)=>{
			// 	console.log(e);
			// 	this.setState({
			// 		errors : e.response.data,
			// 		loading : false
			// 	})
			// })
			
		};

		handleChange =(e)=>{
			this.setState({
				[e.target.name] : e.target.value
			});
		};
	render() {
		const {errors,loading} = this.state;
		const inputStyle ={
			borderTop:"none",
			borderLeft:"none",
			borderRight:"none"
		};
		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-4"></div>
					<div className="col-md-4">
					<div className="text-center">
					<img src="./scream.png" className="img-fluid mt-4"
					 style={{height:"80px",width:"80px"}} alt="logo"/>
					 </div>
						<div className="card border-info mt-2">
							<div className="card-body">
								<form onSubmit={this.handleSubmit}>
									<label htmlFor="email">Email</label>
									<input id="email" className="form-control" name="email"
									style={inputStyle} value={this.state.email}
									onChange={this.handleChange}/>
									<p><small id="emailHelp" className="text-danger">{errors.email}</small></p>
									<label htmlFor="password">Password</label>
									<input id="password" className="form-control" name="password"
									style={inputStyle} value={this.state.password}
									onChange={this.handleChange}/>
									<p><small id="emailHelp" className="text-danger">{errors.password}</small></p>
									<label htmlFor="confirmPassword">Confirmpassword</label>
									<input id="confirmPassword" className="form-control" name="confirmPassword"
									style={inputStyle} value={this.state.confirmPassword}
									onChange={this.handleChange}/>
									<p><small id="emailHelp" className="text-danger">{errors.password}</small></p>
									<label htmlFor="handle">Handle</label>
									<input id="handle" className="form-control" name="handle"
									style={inputStyle} value={this.state.handle}
									onChange={this.handleChange}/>
									<p><small id="emailHelp" className="text-danger">{errors.handle}</small></p>
									<div className="text-center"> 
									<button type="submit" className="btn btn-outline-info mt-3">Create Account</button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="col-md-4"></div>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps =(state)=>({
	// used to access the data inside our reducers
	user : state.user,
	UI : state.UI
});

const mapActionsToProps ={ //specifies the actions we are using
	signupUser
};

export default connect(mapStateToProps,mapActionsToProps)(signup);
