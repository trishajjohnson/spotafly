import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Homepage.css";

function Homepage() {
    const { currentUser } = useContext(UserContext);

    
    return (
        <div className="Homepage">
          <div className="container text-center">
            <h1 className="pt-5 mb-4 font-weight-bold">Spotafly</h1>
            <p className="lead">All the music you could want, in one place.</p>
            {currentUser
                ? <h2>
                  Welcome Back, {currentUser.firstName || currentUser.username}!
                </h2>
                : (
                    <p>
                      <Link className="btn font-weight-bold btnbrdr"
                            to="/signup">
                        Sign up
                      </Link>
                      <Link className="btn font-weight-bold mr-3 btnbrdr"
                            to="/login">
                        Log in
                      </Link>
                    </p>
                )}
          </div>
        </div>
    );
  }
  
  export default Homepage;