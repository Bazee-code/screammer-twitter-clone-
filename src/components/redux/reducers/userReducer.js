import {SET_USER,SET_AUTHENTICATED,SET_UNAUTHENTICATED,LOADING_USER,
		MARK_NOTIFICATIONS_READ,UNLIKE_SCREAM,LIKE_SCREAM} from './../actions/types.js';

const initialState = {
	authenticated : false,
	loading : false,
	credentials : {},
	likes : [],
	notifications : []
};

export default function(state = initialState,action){
	switch(action.type){
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated : true
			}

		case SET_UNAUTHENTICATED:
			return initialState;

		case LOADING_USER:
			return {
				...state,
				loading : true
			}
		case LIKE_SCREAM:
			return{
				...state,
				likes : [
					...state.likes,
					{
						userHandle : state.credentials.handle,
						screamId : action.payload.screamId
					}
				]
			}
		case UNLIKE_SCREAM :
			return {
				...state,
				likes : state.likes.filter((like)=>like.screamId !== action.payload.screamId)
		}
		case SET_USER:
			return {
				authenticated : true,
				loading : false,
				...action.payload
			}
		case MARK_NOTIFICATIONS_READ:
			state.notifications.forEach(not => not.read = true);
			return {
				...state
			}
		default :
			return state;
	}
};