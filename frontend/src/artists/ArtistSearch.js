import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";
import SpotaflyApi from "../api/api";
import ArtistList from "../artists/ArtistList";
// import AlbumList from "../albums/AlbumList";
// import LoadingSpinner from "../common/LoadingSpinner";
import SearchForm from "../discover/SearchForm";
import "./ArtistSearch.css";



function ArtistSearch() {
    const { currentUser } = useContext(UserContext);
    const [artists, setArtists] = useState(null);
    const [searchComplete, setSearchComplete] = useState(false);

    async function search(searchTerm) {
        setSearchComplete(false);
        let res = await SpotaflyApi.getArtists(searchTerm);
        console.log("searching...");
        console.log("result from search function in ArtistSearch.js", res.result);
        console.log("result from search function in ArtistSearch.js", res.result);
        setArtists(res.result);
        setSearchComplete(true);
    }

    async function paginate(url) {
        // setSearchComplete(false);
        let res = await SpotaflyApi.paginate(url);
        setArtists(res.result);
        setSearchComplete(true);
    }
 

    function showArtists() {
        if(artists.artists.items.length) {
            return (
                <div>
                    <p className="lead numResults">Results {Number(artists.artists.offset)+1}-{Number(artists.artists.offset)+artists.artists.items.length} of {artists.artists.total}</p>
                    <ArtistList artists={artists} paginate={paginate} />
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
        
        <div className="AlbumSearch">
            <h1 className="mt-3 mb-5">
                Search Artists
            </h1>
            <SearchForm search={search} />
            
            {searchComplete ? showArtists(): <></>}
                
        </div>         
        
    );
}

export default ArtistSearch;