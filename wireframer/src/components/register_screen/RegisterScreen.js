import React, { Component } from 'react'
import {TextInput, Button} from 'react-materialize'
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { registerHandler } from '../../store/database/asynchHandler'

class RegisterScreen extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      }    
    handleChange = (e) => {
    const { target } = e;
    this.setState(state => ({
        ...state,
        [target.id]: target.value,
    }));
    }

    handleSubmit = (e) => {
    e.preventDefault();
    console.log("YEET");
    const { props, state } = this;
    const { firebase } = props;
    const newUser = { ...state };

    props.register(newUser, firebase);
    }

    render() {
        const { auth, authError } = this.props;
        if (auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                 <TextInput
                    icon="email"
                    label="Email"
                    id = "email"
                    onChange = {this.handleChange}
                />
                <TextInput
                    icon="lock"
                    label="Password"
                    id = "password"
                    password
                    onChange = {this.handleChange}
                />
                <TextInput
                    icon="person_pin"
                    label="First Name"
                    id = "firstName"
                    onChange = {this.handleChange}
                />
                <TextInput
                    icon="person_pin"
                    label="Last Name"
                    id = "lastName"
                    onChange = {this.handleChange}
                />
                  <Button
                    node="button"
                    style={{
                    marginRight: '5px'
                    }}
                    waves="light"
                    onClick = {(e)=>this.handleSubmit(e)}
                >
                    Register
                </Button>
                {authError ? <div className="red-text center"><p>{authError}</p></div> : null}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.firebase.auth,
    authError: state.auth.authError,
  });
  
  const mapDispatchToProps = dispatch => ({
    register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase)),
  });
  
  export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps),
  )(RegisterScreen);