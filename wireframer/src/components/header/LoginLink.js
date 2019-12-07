import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { logoutHandler } from '../../store/database/asynchHandler'

export default class LoginLink extends Component {
    render() {
        return (
            <div className = "right">
                <NavLink to = "/login">Login</NavLink>
            </div>
        )
    }
}
