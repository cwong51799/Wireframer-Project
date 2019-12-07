import React, { Component } from 'react'
import LoginLink from './LoginLink'
import {Navbar, Icon, NavItem} from 'react-materialize'

export default class Header extends Component {
    render() {
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
            <NavItem href="http://localhost:3000/databaseTester">
              Database
            </NavItem>
            {
            /* First checks if on login page, if yes, then display register option, if no,
            Second check should be if logged in, if yes, show logout, if no, show login. */
            }
            {false ? <NavItem href = "http://localhost:3000/register">
                Register
            </NavItem> : (true ? 
                <NavItem href="http://localhost:3000/login">
                Login
                </NavItem> 
                :
                <NavItem href="http://localhost:3000/login">
                Logout
            </NavItem>)
            }
          </Navbar> 
        )
    }
}


/*
<div id = "header">
                <a id="homeLink" href="http://localhost:3000/">Wireframer</a>
                {true ? <LoginLink/> : false}
                <a className="right" href="http://localhost:3000/databaseTester">Database Tester</a>
            </div>
            */
