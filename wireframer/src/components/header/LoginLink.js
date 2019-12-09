import React from 'react';
import { NavItem } from 'react-materialize';

class LoginLink extends React.Component {
  render() {
    const onLoginPage = (window.location.href.includes("login"));
    console.log(onLoginPage);
    return (
      <ul className = "right" >
        {!onLoginPage ? <li><NavItem href="/login">Login</NavItem></li> : <li><NavItem href="/register">Register</NavItem></li>}
      </ul>
    );
  }
}

export default LoginLink;