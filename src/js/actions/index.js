import axios from "axios";

export function fetchReminders() {
	//const URL = 'reminderList.json';
	return {
		type: 'FETCH_REMINDERS',
		payload: /*axios.get(URL)*/JSON.parse(localStorage.getItem('reminders') || '[]')
	}
}


export function addReminders(obj) {
	let data = JSON.parse(localStorage.getItem('reminders') || '[]');
    data.push(obj);
    localStorage.setItem('reminders', JSON.stringify(data));
    return {
		type: 'ADD_REMINDERS',
		payload: data
	}
}