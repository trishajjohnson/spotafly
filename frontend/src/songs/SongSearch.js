import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";
import SpotaflyApi from "../api/api";
// import ArtistList from "../artists/ArtistList";
import SongList from "../songs/SongList";
import LoadingSpinner from "../common/LoadingSpinner";
import SearchForm from "../discover/SearchForm";
import "./SongSearch.css";



function SongSearch() {
    const { currentUser } = useContext(UserContext);
    const [songs, setSongs] = useState(null);
    const [searchComplete, setSearchComplete] = useState(false);

    async function search(searchTerm) {
        setSearchComplete(false);
        let res = await SpotaflyApi.getSongs(searchTerm);
        console.log("searching...");
        setSongs(res.tracks);
        setSearchComplete(true);
    }

    async function paginate(url) {
        // setSearchComplete(false);
        let res = await SpotaflyApi.paginate(url);
        console.log("res in paginate SongSearch", res);
        setSongs(res);
        setSearchComplete(true);
    }
 

    function showSongs() {
        if(songs.items.length) {
            return (
                <div>
                    <p className="lead numResults">Results {Number(songs.offset)+1}-{Number(songs.offset)+songs.items.length} of {songs.total}</p>
                    <SongList songs={songs} paginate={paginate} />
                </div>
            )
        } else {
            return (
                <p className="lead">There are no results.</p>
            )
        }
    }

    if (!currentUser) return <Redirect to="/login" />


    return (
        
        <div className="SongSearch">
            <h1 className="mt-3 mb-5">
                Search Songs
            </h1>
            <SearchForm search={search} />
            
            {searchComplete ? showSongs(): <></>}
                
        </div>         
        
    );
}

export default SongSearch;