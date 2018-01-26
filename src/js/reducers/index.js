import { combineReducers } from 'redux';
//import { routerReducer } from 'react-router-redux'
import reminderReducer from './reminderReducer';
import commonReducer from './commonReducer';


export default combineReducers({
	reminderReducer,
	commonReducer
	//routing: routerReducer
})