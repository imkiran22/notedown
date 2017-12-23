import React from "react";
import ReactDOM from "react-dom";
import { Route, Link } from 'react-router-dom';
import Reminder from './containers/reminder';

export default class App extends React.Component {
   constructor(props) {
     super(props);
   }
   collapse(bool) {
     const mainView = document.querySelector('section.main-view');
     const sideNav = document.querySelector('section.side-nav');
     const collapseBtn = document.getElementById('collapse');

     if (!bool) {
       sideNav.className = sideNav.className + ' width0';
       mainView.className = mainView.className + ' left0';
       collapseBtn.style.display = 'block';
       return;
     } 
     sideNav.className = sideNav.className.replace('width0', '');
     mainView.className = mainView.className.replace('left0', '');
     collapseBtn.style.display = 'none';
   }

   componentDidMount() {
     /*document.getElementById('collapse').style.display = 'none';
     document.getElementById('show').style.display = 'none';*/
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
           <Route exact path="/reminders" component={Reminder}></Route>
          </main>
        </section>
      </div>  
     );
   }
}
