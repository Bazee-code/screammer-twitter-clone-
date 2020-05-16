import React from 'react';
import moment from 'moment';
import {AiOutlineLike} from 'react-icons/ai';
import {FaRegComment} from 'react-icons/fa';
import {MdExpandMore} from 'react-icons/md';
import {Link} from 'react-router-dom';

// REDUX
import {connect} from 'react-redux';
import {likeScream,unlikeScream} from './redux/actions/dataActions.js';

// local
import DeleteScream from './deletescream.js';
import ScreamDialog from './screamDialog.js';

class scream extends React.Component {
	likedScream = ()=>{
		if(this.props.user.likes && this.props.user.likes.find((like)=>like.screamId === this.props.scream.screamId))
			return true;
		else return false;
	};
	likeScream = ()=>{
		this.props.likeScream(this.props.scream.screamId);
	};
	unlikeScream = ()=>{
		this.props.unlikeScream(this.props.scream.screamId);
	};

	render() {
		const {scream:{body,createdAt,userHandle,userImage,screamId,
			likeCount,commentCount}} = this.props;
		const {user:{credentials:{handle}}} = this.props;
		const {user:{authenticated}} = this.props;
		const likeButton = !authenticated ?(
			<Link to="/login"><button className="btn btn-sm btn-light"><AiOutlineLike />
			</button></Link>
			):(
				this.likedScream() ?(
					<button className="btn btn-sm btn-info" 
					onClick={this.unlikeScream}><AiOutlineLike /></button>
					):(<button className="btn btn-sm btn-light" 
					onClick={this.likeScream}><AiOutlineLike /></button>)
			);
		const deleteButton = (authenticated && userHandle == handle) ?(
			<DeleteScream screamId={screamId} />
			) : null;

		const screamDetailsButton = (authenticated)?(
			<ScreamDialog screamId ={screamId}/>) : null;
		return (
			<div className="card">
				<div className="card-body" >
				<h6 className="text-right">{screamDetailsButton}</h6>
				<img src={userImage} className="rounded-circle" 
				style={{height:"80px",width:"80px"}} alt="profile-pic"/>
					<h6 className="text-info">{userHandle}
					<span>{deleteButton}</span>
					</h6>
					<p className="text-muted"><small>{moment(createdAt).calendar()}</small></p>
					<h5>{body}</h5>
						{likeButton}
					<span><small className="mr-2">{likeCount}likes</small></span>
					<FaRegComment />
					<span><small>{commentCount}comments</small></span>
					<div className="text-center" data-toggle="modal" data-target="#oneScream">
					<Link to={`/users/${userHandle}`}>
						<small>View {userHandle}'s profile <MdExpandMore /></small>
					</Link>
					</div>
				</div>
				
			</div>	
		)
	}
}

const mapStateToProps = (state)=>({
	data : state.data,
	user : state.user
});

const mapActionsToProps = {
	likeScream,
	unlikeScream
};

export default connect(mapStateToProps,mapActionsToProps)(scream);