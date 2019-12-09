import React, { Component } from 'react'
import {Navbar, Icon, NavItem} from 'react-materialize'
import LogOutLink from './LogOutLink'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import LoginLink from './LoginLink';

class Header extends Component {

    render() {
       // Header needs to know if it's on the login page.
        const {auth, profile } = this.props;
        const links = auth.uid ? <LogOutLink profile={profile} /> : <LoginLink/>;
        const isAdmin = profile.administrator;
        return (
            // Hard routing to the places with href, is this OK instead of using navlink? 
            <Navbar
                alignLinks="right"
                brand={<NavLink to = "/" className="brand-logo">Wireframer</NavLink>}
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
            {isAdmin ?
             <NavLink to = "/databaseTester">
                  Database
             </NavLink> : <p></p>
            }
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
