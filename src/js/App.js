import React from "react";
import ReactDOM from "react-dom";

export default class App extends React.Component {
   constructor(props) {
     super(props);
   }
   render() {
     return (
      <div class="container">
       <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">NoteDown</a>
          </div>
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Notes</a></li>
            <li><a href="#">Reminders</a></li>
            <li><a href="#">Status</a></li>
            <li><a href="#">Todo</a></li>
          </ul>
        </div>
      </nav>
      </div>
     );
   }
}
