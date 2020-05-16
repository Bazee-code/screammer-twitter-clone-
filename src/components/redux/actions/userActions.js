import {SET_USER,SET_ERRORS,CLEAR_ERRORS,LOADING_UI,SET_UNAUTHENTICATED
	,LOADING_USER,MARK_NOTIFICATIONS_READ} from './types.js';
import axios from 'axios';

const proxy = `https://cors-anywhere.herokuapp.com/`;
const url = `${proxy}https://us-central1-screammer-3df4b.cloudfunctions.net/api`;

export const loginUser = (userData,history) =>(dispatch)=>{
	dispatch({type : LOADING_UI});
	axios.post(url+'/login',userData)
			.then((res)=>{
				// console.log(res.data); //token is sent back
				// we now want to save our token in our local storage so that when we refresh our page we aren't logged out
				const FBIdToken = `Bearer ${res.data.token}`;
				localStorage.setItem(`FBIdToken`,FBIdToken);
				axios.defaults.headers.common[`Authorization`] = FBIdToken;
				dispatch(getUserData());
				dispatch({type : CLEAR_ERRORS});
				// redirect user to home page
				history.push('/'); //we use this to pass state to our url and redirect to it
			})
			.catch((e)=>{
				// console.log(e.response.data);
				dispatch({
					type : SET_ERRORS
					// payload : e.response.data
				})
			})
};

export const signupUser = (newuserData,history) =>(dispatch)=>{
	dispatch({type : LOADING_UI});
	axios.post(url+'/signup',newuserData)
			.then((res)=>{
				console.log(res.data); //token is sent back
				// we now want to save our token in our local storage so that when we refresh our page we aren't logged out
				const FBIdToken = `Bearer ${res.data.token}`;
				localStorage.setItem(`FBIdToken`,FBIdToken);
				axios.defaults.headers.common[`Authorization`] = FBIdToken;
				dispatch(getUserData());
				dispatch({type : CLEAR_ERRORS});
				// redirect user to home page
				history.push('/'); //we use this to pass state to our url and redirect to it
			})
			.catch((e)=>{
				// console.log(e.response.data);
				dispatch({
					type : SET_ERRORS,
					payload : e.response.data
				})
			})
};

export const logoutUser = ()=>(dispatch)=>{
	// basically delete our auth token stored in our storage
	localStorage.removeItem(`FBIdToken`);
	delete axios.defaults.headers.common[`Authorization`];
	dispatch({type : SET_UNAUTHENTICATED});
};

export const uploadImage = (formData)=>(dispatch)=>{
	dispatch({type : LOADING_USER});
	axios.post(url+'/user/image',formData)
	.then((res)=>{
		dispatch(getUserData());
	})
	.catch((e)=>{
		console.log(e);
	})
};

export const getUserData = ()=>(dispatch)=>{
	dispatch({type:LOADING_USER});
	axios.get(url + '/user')
	.then((res)=>{
		dispatch({
			type : SET_USER,
			payload : res.data
		})
	})
	.catch((e)=>{
		console.log(e);	
	});
};

export const editUserDetails =(userDetails) =>(dispatch)=>{
	dispatch({type:LOADING_USER});
	axios.post(url + '/user',userDetails)
	.then(()=>{
		dispatch(getUserData());
	})
	.catch((e)=>{
		console.log(e);
	});
};

// export const markNotificationsRead =(notificationIds)=>(dispatch)=>{

// 	axios.post(url+`/notifications`,notificationsIds)
// 	.then((res)=>{
// 		dispatch({
// 			type : MARK_NOTIFICATIONS_READ
// 		})
// 	})
// 	.catch((e)=>{
// 		console.log(e);
// 	})
// };