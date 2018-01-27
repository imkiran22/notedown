import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import Reminder from './containers/reminder';
import Todo from './containers/todo';
import Status from './containers/status';
import Notes from './containers/notes';
import store from './Store';
import Alert from './common/Alert';
import $ from 'jquery';
import Audio from './common/Audio';
import {playAudio} from './actions';
@withRouter
export default class App extends React.Component {
   timeDelay = null;
   constructor(props) {
     super(props);
     this.notifyMe();
     console.log('STORE', store.getState());
     this.state = {expand: false};
     //store.dispatch();
     // store.subscribe(function(state) {
     //    console.log('STATE', state);
     // })
   }

   notifyMe() {
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }
      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        
      }
      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            console.log(Notification.permission);
            // var notification = new Notification("Hi there!");
            // var notification = new Notification(obj.title, {body: obj.desc});
            // notification.title = obj.title;
            // notification.body = obj.desc;
          }
        });
      }
      // At last, if the user has denied notifications, and you 
      // want to be respectful there is no need to bother them any more.
    }

   collapse(bool) {
     const mainView = document.querySelector('section.main-view');
     const sideNav = document.querySelector('section.side-nav');
     const anchor = $(sideNav).find('nav a');
     //const collapseBtn = document.getElementById('collapse');

     this.setState({
        expand:bool
     })

     if (bool) {
       sideNav.className = sideNav.className + ' width0';
       mainView.className = mainView.className + ' left0';
       anchor.addClass('reset');
       mainView.style.width = '100%';
       //collapseBtn.style.display = 'block';
       return;
     } 
     sideNav.className = sideNav.className.replace('width0', '');
     mainView.className = mainView.className.replace('left0', '');
     anchor.removeClass('reset');
     mainView.style.width = '85%';
     //collapseBtn.style.display = 'none';
   }

   componentDidMount() {
     this.triggerReminders();
     this.onRouteChanged();
   }

   componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        this.onRouteChanged();
      }
    }

    onRouteChanged() {
       let location = this.props.location.pathname;
       if (location.startsWith('/reminders') || location === '/') {
          location = '/reminders';
       }
       const DOM = $('section.side-nav');
       DOM.find('nav a').removeClass('active');
       DOM.find(`nav a[href='${location}']`).addClass('active');
    }


   triggerReminders() {
        this.timeDelay = setInterval(() => {
          const reminder = store.getState().reminderReducer;
          if (reminder && reminder.length) {
            reminder.forEach((obj, index, array) => {
               let lastCutoffTime = new Date(obj.lastCutoffTime).valueOf();
               let currentTime = new Date().valueOf();
               let diff = currentTime - lastCutoffTime;
               if (diff >= 0 && diff <= 60000) {
                  if (Notification.permission === "granted") {
                    var notification = new Notification(obj.title, {body: obj.desc});
                    store.dispatch(playAudio({type: 'PLAY_AUDIO', payload: true}));
                    array.splice(index, 1);
                  }
               }
            })
          }
       }, 30000);
   }

   componentWillUnMount() {
      clearInterval(this.timeDelay);
   }

   render() {
     return (
      <div id="wrapper">
        <Alert/>
        <Audio/>
        <section class="side-nav">
           <a id="show" class="pull-right" onClick={this.collapse.bind(this, this.state.expand ? false : true)}><i class={this.state.expand ? "fa fa-expand whiteI" : "fa fa-window-close whiteI"}></i></a>
           <nav>
            <Link to="/notes">Notes</Link>
            <Link to="/reminders">Reminders</Link>
            <Link to="/status">Status</Link>
            <Link to="/todo">Todo</Link>
          </nav>
        </section>
        <section class="main-view">
          <main>
          <Switch>
           <Route exact path="/" component={Reminder}></Route>
           <Route path="/reminders" component={Reminder}></Route>
           <Route exact path="/todo" component={Todo}></Route>
           <Route exact path="/status" component={Status}></Route>
           <Route exact path="/notes" component={Notes}></Route>
           </Switch>
          </main>
        </section>
      </div>  
     );
   }
}
