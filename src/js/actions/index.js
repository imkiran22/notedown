import axios from "axios";

export function fetchReminders() {
	const URL = 'http://reduxblog.herokuapp.com/api/posts';
	return {
		type: 'FETCH_REMINDERS',
		payload: axios.get(URL)
	}
}