import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

class profileuser extends React.Component {
	render() {
		const {imageUrl,handle,website,createdAt} = this.props.profile;
		// console.log(profile);
		const imgStyle ={
			height :"350px",
			width :"350px"
		};
		return (
			<div className="card-body text-center">
				<img src ={imageUrl} className="img-fluid" style={imgStyle}/>
				<h4 className="text-info">{handle}</h4>
				<p className="text-primary"><Link to={website}>{website}</Link></p>
				<p>Created on : {moment(createdAt).calendar()}</p>
			</div>
		)
	}
}

export default profileuser;