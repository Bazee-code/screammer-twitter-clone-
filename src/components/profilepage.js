import React from 'react';
import axios from 'axios';

// REDUX
import {connect} from 'react-redux';
import {getUserData} from './redux/actions/dataActions.js';

// local
import Scream from './scream.js';
import ProfileUser from './profileuser.js';
import ScreamAloneDialog from './screamalonedialog.js';

const proxy = `https://cors-anywhere.herokuapp.com/`;
const url = `${proxy}https://us-central1-screammer-3df4b.cloudfunctions.net/api`;

class profilepage extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			profile : null,
			screamIdParam:null
		};
	};

	componentDidMount(){
		const handle = this.props.match.params.handle; //a url method that gives you access to var
		// that are passed in the url
		console.log(handle);
		const screamId = this.props.match.params.screamId;

		if(screamId){
			this.setState({
				screamIdParam : screamId
			});
		};
		
		// console.log(window.location.hostname);
		this.props.getUserData(handle);
		axios.get(url+`/users/${handle}`)
			.then((res)=>{
				console.log(res.data);
				this.setState({
					profile : res.data.user
				})
			})
			.catch((e)=>{
				console.log(e);
			})
	};

	render() {
		const {profile,screamIdParam} = this.state;
		const {data:{screams,loading}} = this.props;
		console.log(screams);

		// const screamsMarkup = !loading ? (screams.map(scream=>(
		// 	<Scream scream={scream} key={scream.screamId}/>))) 
		// : (<p>User has no screams yet</p>);

		return (
			<React.Fragment>
				<section className="profile-section py-3">
					<div className="row">
						<div className="col-md-4"></div>
						<div className="col-md-4">
							<div className="card profile-card bg-light">
						
								{profile !== null ?
									<ProfileUser profile={this.state.profile}/>
									: <p>User profile loading</p>
								}
							</div>

						</div>
						<div className="col-md-4"></div>
					</div>
				</section>
				<section>
				<h5 className="text-dark text-center">view screams below</h5>
					<div className="row">
						{!loading ? screams.map(scream=>{
							return (
								<div className="col-md-6">
									<Scream scream={scream} key={scream.screamId} />
								</div>
								)
						}): screamIdParam ?(
						screams.map(scream=>{
							if(scream.screamId !== screamIdParam){
								return( 
								<div className="col-md-6">
									<Scream scream={scream} key={scream.screamId}/>
								</div>)
							}
							else {
								return ( <ScreamAloneDialog scream={scream} key={scream.screamId}/>
							)}
						}))
						: <p>User has no screams</p> } 
					</div>			
				</section>
			</React.Fragment>
		)
	}
}

const mapStateToProps =(state)=>({
	data : state.data
});

const mapActionsToProps = {
	getUserData
};
export default connect(mapStateToProps,mapActionsToProps)(profilepage);