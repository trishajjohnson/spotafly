import React, { useState, useEffect } from "react";
import Routes from "./routes/Routes";
import Navbar from "./navbar/Navbar";
import UserContext from "./auth/UserContext";
import SpotaflyApi from "./api/api";
import LoadingSpinner from "./common/LoadingSpinner";
import jwt from "jsonwebtoken";
import './App.css';

const STORE_TOKEN_ID = "token-id";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const initialVal = localStorage.getItem(STORE_TOKEN_ID) || null;
  const [token, setToken] = useState(initialVal);
  // const [followedArtistIds, setFollowedArtistIds] = useState(new Set([]));
  // const [favoriteSongIds, setFavoriteSongIds] = useState(new Set([]));

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let {username} = jwt.decode(token);
          SpotaflyApi.token = token;
          let currUser = await SpotaflyApi.getCurrentUser(username);
          setCurrentUser(currUser);
          // setFavoriteSongIds(new Set(currentUser.favoriteSongs));
          // setFollowedArtistIds(new Set(currentUser.followedArtists));
        } catch(e) {
          console.log(e);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true)
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token])

  async function login(loginData) {
    try {
      let token = await SpotaflyApi.login(loginData);
      console.log("token in login of App.js", token.token)
      localStorage.setItem(STORE_TOKEN_ID, token.token);
      setToken(localStorage.getItem(STORE_TOKEN_ID));
      return { success: true };
    } catch(e) {
      console.log("Errors: ", e);
      return { success: false, e }
    }
  }

  async function signup(signupData) {
    try {
      let token = await SpotaflyApi.signup(signupData);
      localStorage.setItem(STORE_TOKEN_ID, token);
      setToken(localStorage.getItem(STORE_TOKEN_ID));
      return { success: true };
    } catch(e) {
      console.log("Errors: ", e);
    }
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem(STORE_TOKEN_ID);
    setToken(null);
  }

  if(!infoLoaded) return <LoadingSpinner />;


  return (
    <UserContext.Provider
            value={{ currentUser, setCurrentUser }}>
      <div className="App">
          <Navbar logout={logout} />
          <Routes login={login} signup={signup} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
