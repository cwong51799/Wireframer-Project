import React, { Component } from 'react'
import {Navbar, Icon, NavItem} from 'react-materialize'
import LogOutLink from './LogOutLink'
import RegisterLink from './RegisterLink'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { logoutHandler } from '../../store/database/asynchHandler'
import LoginLink from './LoginLink';

class Header extends Component {
    render() {
       // Header needs to know if it's on the login page.
        const {auth, profile } = this.props;
        const links = auth.uid ? <LogOutLink profile={profile} /> : <LoginLink/>;
        return (
            // Hard routing to the places with href, is this OK instead of using navlink? 
            <Navbar
                alignLinks="right"
                brand={<a className="brand-logo" href="http://localhost:3000/">Wireframer</a>}
                menuIcon={<Icon>menu</Icon>}
                options={{
                draggable: true,
                edge: 'left',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 200,
                preventScrolling: true
                }}
            >
            <NavLink to = "/editScreen">
                Edit Screen
            </NavLink>
            <NavLink to = "/databaseTester">
              Database
            </NavLink>
            {links}
            </Navbar>
        )
    }
}


const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(Header);

/*
<div id = "header">
                <a id="homeLink" href="http://localhost:3000/">Wireframer</a>
                {true ? <LoginLink/> : false}
                <a className="right" href="http://localhost:3000/databaseTester">Database Tester</a>
            </div>
            */
