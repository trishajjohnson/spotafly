import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";
import SpotaflyApi from "../api/api";
import SongList from "../songs/SongList";
import SearchForm from "../discover/SearchForm";
import "./SongSearch.css";

/** Song Search page.
 *
 * Renders SearchForm and displays search results.
 *
 * Routed at /discover/songs
 *
 * Routes -> SongSearch -> SongList
 */

function SongSearch() {
    const { currentUser } = useContext(UserContext);
    const [songs, setSongs] = useState(null);
    const [searchComplete, setSearchComplete] = useState(false);

    async function search(searchTerm) {
        setSearchComplete(false);
        let res = await SpotaflyApi.getSongs(searchTerm);
        setSongs(res.tracks);
        setSearchComplete(true);
    }

    async function paginate(url) {
        let res = await SpotaflyApi.paginate(url);
        setSongs(res.result.tracks);
        setSearchComplete(true);
    }
 

    function showSongs() {
        if(songs.items.length) {
            return (
                <div className="mt-5">
                    <p className="lead numResults">Results {Number(songs.offset)+1}-{Number(songs.offset)+songs.items.length} of {songs.total}</p>
                    <SongList songs={songs} paginate={paginate} />
                </div>
            );
        } else {
            return (
                <p className="lead mt-5">There are no results.</p>
            );
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