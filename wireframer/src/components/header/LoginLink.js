import React from 'react';
import { NavLink} from 'react-router-dom';
import { NavItem } from 'react-materialize';

class LoginLink extends React.Component {
  render() {
    const onLoginPage = (window.location.href.includes("login"));
    return (
      <ul className = "right" >
        {!onLoginPage ? <li><NavItem href="/login">Login</NavItem></li> : <li><NavLink to="/register">Register</NavLink></li>}
      </ul>
    );
  }
}

export default LoginLink;