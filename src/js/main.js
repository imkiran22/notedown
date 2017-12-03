import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import '../scss/main.scss';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//import { ConnectedRouter } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router'
import store, { history } from './Store'
import App from './App';

ReactDOM.render(<Provider store = {store}>
        <Router history={history}>
          <div>
	        <App/>
	      </div>
        </Router>
	</Provider>, document.getElementById('root'));
