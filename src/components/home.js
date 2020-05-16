import React from 'react';
import axios from 'axios';

// REDUX
import {connect} from 'react-redux';
import {getScreams} from './redux/actions/dataActions.js'; 

// local
import Scream from './scream.js';
import Profile from './profile.js';

const proxy = 'https://cors-anywhere.herokuapp.com/';
const url =`${proxy}https://us-central1-screammer-3df4b.cloudfunctions.net/api`;

class home extends React.Component {
	// constructor(props){
	// 	super(props);

	// 	this.state={
	// 		screams : null
	// 	};
	// };

	componentDidMount(){
		this.props.getScreams();
		// lifecycle method that fires after comps have mounted
		// axios.get(url +'/screams')
		// .then((res)=>{
		// 	console.log(res.data);
		// 	this.setState({
		// 		screams : res.data
		// 	})
		// })
		// .catch((e)=>{
		// 	console.log(e);
		// });
		
	};
	render() {
		const {data:{screams,loading}} = this.props;
		let recentScreamsMarkup = !loading ? (screams.map(scream=>(
			 <Scream scream={scream} key={scream.screamId}/>))) : 
		(<h4>Loading...</h4>);
		return (
			<div>
			<div className="row">
				<div className="col-md-8">
				<div className="card mt-2 border-info">
				<div className="card-body">
					{recentScreamsMarkup}
				</div>
				</div>
				</div>
				<div className="col-md-4 ">
					<div className="card mt-2 d-none d-md-block">
						<Profile />
					</div>	
				</div>
			</div>
			</div>
		)
	}
}

const mapStateToProps = (state)=>({
	data : state.data
});

const mapActionsToProps = {
	getScreams
};

export default connect(mapStateToProps,mapActionsToProps)(home);

// CORS policy is a mechanism that allows the restricted resources of a webpage to be accessed
// be accessed by a webpage that is of a different origin from the restricted resources
// naturally it blocks req from scriptsi.e fetch hence we need a proxy