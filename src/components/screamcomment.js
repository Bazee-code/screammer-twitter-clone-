import React from 'react';
import moment from 'moment';

export class screamcomment extends React.Component {
	render() {
		const {comment:{body,createdAt,userHandle,userImage}} = this.props;
		console.log(body);

		const imgStyle ={
			height:"40px",
			width:"40px"
		};
		return (
			<div className="mt-2">
				<span>
				<img src={userImage} className="rounded-circle" style={imgStyle}/>
				<small className="m-2">{userHandle} said:</small>
				<small className="text-info m-1">{body}</small>
				<small className="text-muted ">{moment(createdAt).calendar()}</small>
				</span>
			</div>
		)
	}
}

export default screamcomment