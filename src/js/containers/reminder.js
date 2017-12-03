import React from "react";
import ReactDOM from "react-dom";
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const Reminder = props => (
   <h1>Welcome to Reminder's Page</h1>
)

const mapDispatchToProps = dispatch => bindActionCreators({
   changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null, 
  mapDispatchToProps
)(Reminder)