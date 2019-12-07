import React from 'react';
import './css/App.css';
import './css/layout.css';
import './css/styles.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import DatabaseTester from './test/DatabaseTester';
import Header from './components/header/Header';
import LoginScreen from './components/login_screen/LoginScreen';
import HomeScreen from './components/home_screen/HomeScreen';
import RegisterScreen from './components/register_screen/RegisterScreen';

function App() {
  //const { auth } = this.props;
  //if (auth.isLoaded){
    return (
      <BrowserRouter>
        <div className = "App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/databaseTester" component={DatabaseTester} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/:any" component={HomeScreen} />
        </Switch>
        </div>
      </BrowserRouter>
    );
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

/* Need to get
export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(App);
  Into working condition, such that the website is reloaded upon database change.
*/

export default App;