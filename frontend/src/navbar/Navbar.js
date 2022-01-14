import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navbar({logout}) {
  const { currentUser } = useContext(UserContext);
  console.log("currentUser", currentUser);
  function loggedIn() {
    return (
      <>
          <NavLink className="nav-item nav-link link" to="/discover">Discover</NavLink>
          <NavLink className="nave-item nav-link link" to="/profile">Profile</NavLink>
          <Link className="nav-item nav-link link" to="/" onClick={logout}>Logout</Link>
      </>
    );
  }

  function loggedOut() {  
    return (
      <>
        <div className="nav-item mr-4">
          <NavLink className="nav-link link" to="/signup">Sign Up</NavLink>
        </div>        
        <div className="nav-item mr-4">
          <NavLink className="nav-link link" to="/login">Login</NavLink>
        </div>
      </>
    );
  }


  return (

    <div className="navbar navbar-expand-lg navbar-dark bg-dark navbar-custom">
      <Link className="navbar-brand  m-3 h1" to="/"><i className="far fa-paper-plane"></i> Spotafly</Link>
      <div className="navbar-nav xtra-margin">
        {currentUser ? loggedIn() : loggedOut()}
      </div>
    </div>
  );
}

export default Navbar;