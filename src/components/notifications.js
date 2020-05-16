import React from 'react';

import {connect} from 'react-redux';
import {markNotificationsRead} from './redux/actions/dataActions.js';

class notifications extends React.Component {
	constructor(props){
		super(props);

		this.state ={
			anchorEl :null
		};
	}
	render() {
		const notifications = this.props.notifications;
		const anchorEl = this.state.anchorEl;

		let notificationIcon;
		if(notifications && notifications.length >0){
			notifications.filter(notification=>notification.read === false).length > 0//not read
			? (notificationIcon=(
					<button>
						Notifications <span className="badge badge-light">{
							notifications.filter(notification=>notification.read == false).length
						}</span>
					</button>
				)) :()
		}	
		return (
			<div>
				
			</div>
		)
	}
}

const mapStateToProps = (state)=>({
	data : state.data
});

const mapActionsToProps = {
	markNotificationsRead
};

export default connect(mapStateToProps,mapActionsToProps)(notifications);