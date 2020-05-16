import {combineReducers} from 'redux';

// local
import userReducer from './userReducer.js';
import dataReducer from './dataReducer.js';
import uiReducer from './uiReducer.js';

export default combineReducers({
	user : userReducer,
	data : dataReducer,
	UI : uiReducer
});