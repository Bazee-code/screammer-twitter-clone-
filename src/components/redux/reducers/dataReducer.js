import {SET_SCREAMS,LIKE_SCREAM,UNLIKE_SCREAM,SET_SCREAM,
				LOADING_DATA,ADD_SCREAM,DELETE_SCREAM,ADD_COMMENT} from './../actions/types.js';

const initialState = {
	screams : [],
	scream : {},
	loading : false
};

export default function(state = initialState, action){
	switch(action.type){
		case LOADING_DATA:
			return {
			...state,
			loading : true
		};
		case SET_SCREAMS:
			return {
			...state,
			screams : action.payload,
			loading : false
		};
		case ADD_SCREAM:
			return{
				...state,
				screams : [
				action.payload,
				...state.screams
				]
			};
		case SET_SCREAM:
			return {
				...state,
				scream : action.payload,
				loading : false
			}
		case LIKE_SCREAM :
		let index = state.screams.findIndex((scream)=>scream.screamId === action.payload.screamId);
			state.screams[index] = action.payload;
			return {
			...state
		};
		case UNLIKE_SCREAM :
			index = state.screams.findIndex((scream)=>scream.screamId === action.payload.screamId);
			state.screams[index] = action.payload;
			return {
			...state
		};
		case ADD_COMMENT :
			return {
				...state,
				scream :{
					...state.scream,
					comments :[
						action.payload,
						...state.scream.comments
					]
				}
			}

		case DELETE_SCREAM :
			index = state.screams.findIndex((scream)=>scream.screamId === action.payload.screamId);
			state.screams.splice(index,1);
			return{
				...state,
			}
		default :
			return state;
	};
};