import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, withRouter } from 'react-router-dom';
//import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchReminders } from '../actions';
import CreateEditReminder from './createEditReminder';


@withRouter
class Reminder extends React.Component {
	//timeDelay = null;
	constructor(props) {
		super(props);
		this.state = {reminder: []};
		//console.log(this.props);
		this.props.fetchReminders();
	}

	componentDidUpdate(prevProps) {
	    if (this.props.location !== prevProps.location) {
	      this.onRouteChanged();
	    }
    }

    onRouteChanged() {
       const location = this.props.location.pathname;
       const DOM = document.querySelector('article.reminders-section');
       if (location === '/reminders/add' || location.startsWith('/reminders/')) {
       	  	 DOM.style.display = 'none';
       } else {
       	  DOM.style.display = 'block';
       }
    }

    componentWillReceiveProps(next) {
    	//console.log(next);
    	this.setState({
    		reminder: next.reminder || []
    	})
    }

    componentDidMount() {
    	this.onRouteChanged();
    }

	render() {
		if (this.state.reminder) {
			return (
			<section class="reminder-container">
			<h1 class="jumbotron">Welcome to Reminder's Page</h1>
			    <article class="reminders-section">  
				     <Link to="/reminders/add"><button class="btn btn-default">Add Reminder</button></Link>
		             <ul class="list-group">
		                  {this.state.reminder.map((obj, index) => {
		                  	return <Link to={`/reminders/${obj.id}`} class="list-group-item" key={index}>{obj.title}</Link>
		                  })}
		             </ul>
	             </article>
                 <Route exact path="/reminders/:id" component={CreateEditReminder}></Route>
             </section>
		   )
		}
		
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