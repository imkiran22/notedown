import axios from "axios";

export function fetchReminders() {
	const URL = 'reminderList.json';
	return {
		type: 'FETCH_REMINDERS',
		payload: axios.get(URL)
	}
}