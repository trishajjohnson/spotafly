import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import SpotaflyApi from "../api/api";
import AlbumList from "../albums/AlbumList";
import LoadingSpinner from "../common/LoadingSpinner";
import "./Homepage.css";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  const [newReleases, setNewReleases] = useState(null);
  const [searchComplete, setSearchComplete] = useState(false);

  useEffect(function loadNewReleases() {
    async function getNewReleases() {
        try {
            console.log("inside useEffect of GenreSearch.js before SpotaflyApi call")
            const newArtistReleases = await SpotaflyApi.getNewReleases();
            setNewReleases(newArtistReleases);
            console.log("newReleases after SpotaflyApi call inside useEffect GenreSearch.js", newReleases)
        } catch(e) {
            console.log(e);
        }
    }
    getNewReleases();
  }, []);

  function showNewReleases() {
    const albums = newReleases.albums;
    console.log("newReleases in showReleases() of Homepage.js", albums)
    return (
        <div>
            <h2 className="pt-3">New Releases</h2>
            <AlbumList albums={albums} paginate={paginate} />
        </div>
    )
  } 

  async function paginate(url) {
    let res = await SpotaflyApi.paginate(url);
    setNewReleases(res.result);
    setSearchComplete(true);
  }

  // if (!currentUser) return <Redirect to="/login" />

  // if(!newReleases) return <LoadingSpinner />
  
  return (
      <div className="Homepage">
        {currentUser
          ? (
              <div className="mb-5">
                {newReleases ? showNewReleases() : <></>}
              </div>
          )
          : (
              <div>
                <h1 className="pt-5 mb-4 font-weight-bold">Spotafly</h1>
                <p className="lead">All the music you could want, in one place.</p>
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
              </div>
            )
        }
      </div>
  );
}
  
  export default Homepage;