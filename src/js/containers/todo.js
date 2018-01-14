import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
//import DatePicker from 'react-datepicker';
//import { fetchReminders, addReminders } from '../actions';
//import moment from 'moment';
//import 'react-datepicker/dist/react-datepicker.css';

export default class Todo extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
           <h1 class="jumbotron">Welcome to Todo Page</h1>
		)
	}
} 