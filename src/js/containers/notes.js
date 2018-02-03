import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
//import DatePicker from 'react-datepicker';
//import { fetchReminders, addReminders } from '../actions';
//import moment from 'moment';
//import 'react-datepicker/dist/react-datepicker.css';

export default class Notes extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<section class="notes module">
              <div class="alert alert-info reset alert-background">
                 <strong class="rem">NOTES</strong>
              </div>
            </section>
		)
	}
} 