import React from 'react';
import './css/App.css';
import './css/layout.css';
import './css/styles.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import DatabaseTester from './test/DatabaseTester';

function App() {
  //const { auth } = this.props;
  //if (auth.isLoaded){
    return (
      <DatabaseTester></DatabaseTester>
    );
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(App);