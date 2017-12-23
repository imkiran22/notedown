import { combineReducers } from 'redux';
//import { routerReducer } from 'react-router-redux'
import reminderReducer from './reminderReducer';


export default combineReducers({
	reminderReducer,
	//routing: routerReducer
})