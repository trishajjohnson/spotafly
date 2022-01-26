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

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let {username} = jwt.decode(token);
          SpotaflyApi.token = token;
          let currUser = await SpotaflyApi.getCurrentUser(username);
          setCurrentUser(currUser);
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

  async function addToFavorites(songId) {
    try {
      await SpotaflyApi.addToFavorites(songId, currentUser.username);
    
      return { success: true };
    } catch(e) {
      console.log("Errors: ", e);
    }
  }

  async function removeFromFavorites(songId) {
    try {
      await SpotaflyApi.removeFromFavorites(songId, currentUser.username);
    
      return { success: true };
    } catch(e) {
      console.log("Errors: ", e);
    }
  }

  async function addToPlaylist(songId, playlistId) {
    console.log("songId in App.js addToPlaylist", songId);
    try {
      await SpotaflyApi.addToPlaylist(songId, playlistId, currentUser.username);
    
      return { success: true };
    } catch(e) {
      console.log("Errors: ", e);
    }
  }

  async function removeFromPlaylist(songId, playlistId) {
    try {
      await SpotaflyApi.removeFromPlaylist(songId, playlistId, currentUser.username);
    
      return { success: true };
    } catch(e) {
      console.log("Errors: ", e);
    }
  }

  async function deletePlaylist(playlistId) {
    try {
      await SpotaflyApi.deletePlaylist(playlistId, currentUser.username);
    
      return { success: true };
    } catch(e) {
      console.log("Errors: ", e);
    }
  }


  if(!infoLoaded) return <LoadingSpinner />;


  return (
    <UserContext.Provider
            value={{ currentUser, setCurrentUser, addToFavorites, removeFromFavorites, addToPlaylist, removeFromPlaylist, deletePlaylist }}>
      <div className="App">
          <Navbar logout={logout} />
          <Routes login={login} signup={signup} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
