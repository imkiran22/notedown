import React from "react";
import ReactDOM from "react-dom";
import { Route, Link } from 'react-router-dom';
//import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchReminders } from '../actions';
import CreateEditReminder from './createEditReminder';

class Reminder extends React.Component {
	//timeDelay = null;
	constructor(props) {
		super(props);
		this.state = {reminder: []};
		//console.log(this.props);
		this.props.fetchReminders();
	}

    componentWillReceiveProps(next) {
    	//console.log(next);
    	this.setState({
    		reminder: next.reminder.list || []
    	})
    }

    
    // setPollingToDisplayReminder() {
    //    this.timeDelay = setInterval(() => {
    //       if (this.state.reminder && this.state.reminder.length) {
    //       	 this.state.reminder.forEach((obj) => {
    //       	 	let lastCutoffTime = new Date(obj.lastCutoffTime).valueOf();
    //       	 	let currentTime = new Date().valueOf();
    //       	 	let diff = lastCutoffTime - currentTime;
    //       	 	if (diff > -60000 && diff < 60000) {
          	 		
    //       	 	}
    //       	 })
    //       }
    //    }, 10000000);

    // }

    // componentWillMount() {
    // 	this.setPollingToDisplayReminder();
    // }
	render() {
		if (this.state.reminder && this.state.reminder.length) {
			return (
			<section class="reminder-container">
			     <Link to="/reminders/add"><button class="btn btn-default">Add Reminder</button></Link>
	             <ul class="list-group">
	                  {this.state.reminder.map((obj, index) => {
	                  	return <Link to={`/reminders/${obj.id}`} class="list-group-item" key={index}>{obj.title}</Link>
	                  })}
	             </ul>
                 <Route exact path="/reminders/:id" component={CreateEditReminder}></Route>
             </section>
		   )
		}
		return (
           <h1>Loading...</h1>
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