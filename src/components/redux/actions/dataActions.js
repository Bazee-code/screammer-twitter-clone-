import {SET_SCREAMS,LOADING_DATA,LIKE_SCREAM,UNLIKE_SCREAM,
	DELETE_SCREAM,ADD_SCREAM,SET_ERRORS,CLEAR_ERRORS,LOADING_UI,SET_SCREAM,
	ADD_COMMENT} from './types.js';
import axios from 'axios';

const proxy = `https://cors-anywhere.herokuapp.com/`;
const url = `${proxy}https://us-central1-screammer-3df4b.cloudfunctions.net/api`;

export const getScreams = ()=>(dispatch)=>{
	dispatch({type : LOADING_DATA});
	axios.get(url+'/screams')
	.then((res)=>{
		dispatch({
			type : SET_SCREAMS,
			payload : res.data
		})
	})
	.catch((e)=>{
		console.log(e);
		dispatch({
			type : SET_SCREAMS,
			payload : []
		})
	});
};

// like a scream
export const likeScream = (screamId)=>(dispatch)=>{
	axios.get(url+`/scream/${screamId}/like`)
	.then((res)=>{
		dispatch({
			type : LIKE_SCREAM,
			payload : res.data
		})
	})
	.catch((e)=>{
		console.log(e);
	})
};

// unlike a scream
export const unlikeScream = (screamId)=>(dispatch)=>{
	axios.get(url+`/scream/${screamId}/unlike`)
	.then((res)=>{
		dispatch({
			type : UNLIKE_SCREAM,
			payload : res.data
		})
	})
	.catch((e)=>{
		console.log(e);
	})
};

export const deleteScream = (screamId)=>(dispatch)=>{
	axios.delete(url+`/scream/${screamId}`)
	.then((res)=>{
		dispatch({
			type : DELETE_SCREAM,
			payload : res.data
		})
	})
	.catch((e)=>{
		console.log(e);
	})
};	

export const addScream = (newScream)=>(dispatch)=>{
	dispatch({type : LOADING_UI});

	axios.post(url+'/scream',newScream)
	.then((res)=>{
		dispatch({
			type : ADD_SCREAM,
			payload : res.data
		})
		dispatch({
			type : CLEAR_ERRORS
		})
	})
	.catch((e)=>{
		dispatch({
			type : SET_ERRORS		
		})
	});
};

export const getScream = (screamId)=>(dispatch)=>{
	dispatch({type:LOADING_UI});

	axios.get(url+`/scream/${screamId}`)
	.then((res)=>{
		dispatch({
			type : SET_SCREAM,
			payload : res.data
		})
	})
	.catch((e)=>{
		console.log(e);
	})
};

export const addComment =(screamId,commentData)=>(dispatch)=>{

	axios.post(url+`/scream/${screamId}/comment`,commentData)
	.then((res)=>{
		dispatch({
			type : ADD_COMMENT,
			payload : res.data
		})
	})
	.catch((e)=>{
		// console.log(e);
		dispatch({
			type : SET_ERRORS
		})
	})
};

export const getUserData = (userHandle)=>(dispatch)=>{
	dispatch({type : LOADING_DATA});

	axios.get(url+`/users/${userHandle}`)
	.then((res)=>{
		dispatch({
			type : SET_SCREAMS,
			payload : res.data.screams
		})
	})
	.catch((e)=>{
		// console.log(e);
		dispatch({
			type : SET_SCREAMS,
			payload : []
		})
	})
};

