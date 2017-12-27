import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { fetchReminders } from '../actions';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class CreateEditReminder extends React.Component {
   reminderId = null;
   constructor(props) {
     super(props);
     this.state = {
   	 	reminderTitle: '',
   	 	lastCutoffTime: moment(),
   	 	title: '',
     	desc: ''
   	 };
   }

   componentDidMount() {
   	 this.triggerRouteChange(this.props);
   }

   setTitle() {
   	 return this.reminderId == 'add' ? 'ADD' : 'EDIT'; 
   }

   addMode() {
     this.setState({
	        reminderTitle: this.reminderId == 'add' ? 'ADD' : 'EDIT',
	   	 	lastCutoffTime: moment(),
	   	 	title: '',
	     	desc: ''
	  })
   }

   editMode() {
	    const reminderObj = this.props.reminder.list.filter((obj) => {
	   	 	return obj.id == this.reminderId;
	   	 })[0];
	   	if (reminderObj && Object.keys(reminderObj).length) {
	   	 	this.setState({
		   	 	lastCutoffTime: moment(new Date(reminderObj.lastCutoffTime)),
		   	 	title: reminderObj.title || '',
		     	desc: reminderObj.desc || ''
	   	 	})
	   	 }
	    //console.log(this.props.reminder);
   }

   triggerRouteChange(nextState) {
   	 const id = nextState.match && nextState.match.params && nextState.match.params.id ? nextState.match.params.id : null;
   	 this.reminderId = id;
   	 if (this.reminderId == 'add') {
   	 	this.addMode();
   	 } else {
   	 	this.editMode();
   	 }
   }

   handleChange(ev) {
   	 console.log(ev);
   	 this.setState({
   	 	lastCutoffTime: ev
   	 })
   }

   componentWillReceiveProps(nextState, prevState) {
   	 //console.log(this.props);
   	 if (nextState.match.params.id != this.reminderId) {
   	 	this.triggerRouteChange(nextState);
   	 }
   }

   // componentDidUpdate() {
   // 	 console.log(this.props.reminder);
   // 	 if (this.reminderId == 'add') { 
   //     this.addMode();
   // 	 } else {
   // 	   this.editMode()
   // 	 }
   // }

   render() {
     return (
        <article class="create-reminder">
	        <h1>{this.state && this.state.reminderTitle ? this.state.reminderTitle : 'ADD'} REMINDER</h1>
	        <form name="create-edit-reminder">
			    <div class="form-group">
			      <label for="title">Title:</label>
			      <input type="text" class="form-control" id="title" placeholder="Enter title" name="title" value={this.state.title}/>
			    </div>
			    <div class="form-group">
			      <label for="desc">Desc:</label>
			      <textarea class="form-control" id="desc" placeholder="Enter description" name="desc" value={this.state.desc}/>
			    </div>
			    <div class="form-group">
			      <label>Select a time</label>
                   <DatePicker
                        className="form-control width-200" 
					    selected={this.state && this.state.lastCutoffTime ? this.state.lastCutoffTime : moment()}
					    onChange={this.handleChange.bind(this)}
					    showTimeSelect
					    timeFormat="HH:mm:ss"
					    timeIntervals={1}
					    dateFormat="LLL"
					/>
			    </div>
			    <button type="submit" class="btn btn-default">Submit</button>
	        </form>
        </article>
     );
   }
}

function mapStateToProps(state) {
  return {
  	reminder: state.reminderReducer
  }
}

export default connect(mapStateToProps, {fetchReminders})(CreateEditReminder)
