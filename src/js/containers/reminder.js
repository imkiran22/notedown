import React from "react";
import ReactDOM from "react-dom";
//import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchReminders } from '../actions';

class Reminder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {reminder: 'Reminders Note'};
		console.log(this.props);
		this.props.fetchReminders();
	}

    componentDidUpdate() {
    	console.log(this.props);
    }
	render() {
		return (
           <h1>{this.state.reminder}</h1>
		)
	}
}

function mapStateToProps(state) {
  return {
  	reminder: state.reminderReducer
  }
}
// const mapDispatchToProps = dispatch => bindActionCreators({
//    //changePage: () => push('/about-us')
// }, dispatch)

export default connect(
  mapStateToProps, 
  {fetchReminders}
)(Reminder)