import React from "react";
import ReactDOM from "react-dom";
import { Route, Link } from 'react-router-dom';
import Reminder from './containers/reminder';
import store from './Store';

export default class App extends React.Component {
   timeDelay = null;
   constructor(props) {
     super(props);
     this.notifyMe();
     console.log('STORE', store.getState());
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
        // var notification = new Notification(obj.title, {body: obj.desc});
        // notification.title = obj.title;
        // notification.body = obj.desc;
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
     const collapseBtn = document.getElementById('collapse');

     if (!bool) {
       sideNav.className = sideNav.className + ' width0';
       mainView.className = mainView.className + ' left0';
       mainView.style.width = '100%';
       collapseBtn.style.display = 'block';
       return;
     } 
     sideNav.className = sideNav.className.replace('width0', '');
     mainView.className = mainView.className.replace('left0', '');
     mainView.style.width = '75%';
     collapseBtn.style.display = 'none';
   }

   componentDidMount() {
     this.triggerReminders();
   }

   triggerReminders() {
        this.timeDelay = setInterval(() => {
          const reminder = store.getState().reminderReducer;
          if (reminder && reminder.length) {
            reminder.forEach((obj, index, array) => {
               let lastCutoffTime = new Date(obj.lastCutoffTime).valueOf();
               let currentTime = new Date().valueOf();
               let diff = currentTime - lastCutoffTime;
               if (diff > -60000 && diff < 60000) {
                  if (Notification.permission === "granted") {
                    var notification = new Notification(obj.title, {body: obj.desc});
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
        <section class="side-nav">
           <a id="show" class="pull-right" onClick={this.collapse.bind(this, false)}><i class="fa fa-window-close whiteI"></i></a>
           <nav>
            <Link to="/notes">Notes</Link>
            <Link to="/reminders">Reminders</Link>
            <Link to="/status">Status</Link>
            <Link to="/todo">Todo</Link>
          </nav>
        </section>
        <section class="main-view">
          <button id="collapse" class="btn btn-sm btn-danger" onClick={this.collapse.bind(this, true)}><span class="glyphicon glyphicon-menu-hamburger"></span></button>
          <main>
           <Route path="/reminders" component={Reminder}></Route>
          </main>
        </section>
      </div>  
     );
   }
}
