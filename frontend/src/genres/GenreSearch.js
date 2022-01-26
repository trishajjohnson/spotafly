import React, { useState, useContext, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import UserContext from "../auth/UserContext";
import SpotaflyApi from "../api/api";
import ArtistList from "../artists/ArtistList";
import AlbumList from "../albums/AlbumList";
import LoadingSpinner from "../common/LoadingSpinner";
import SearchForm from "../discover/SearchForm";
import "./GenreSearch.css";



function GenreSearch() {
    const genre = useParams().genre;
    const genreName = `${genre[0].toUpperCase()}${genre.slice(1)}`
    console.log("genre", genre);
    const { currentUser } = useContext(UserContext);
    const [artists, setArtists] = useState(null);
    const [searchComplete, setSearchComplete] = useState(false);

    async function search(searchTerm) {
        setSearchComplete(false);
        let res = await SpotaflyApi.getArtists(searchTerm, genre);
        console.log("searching...");
        console.log("result from search function in GenreSearch.js", res.result);
        setArtists(res.result);
        console.log("artist search result in search function of genreSearch", artists)
        setSearchComplete(true);
    }

    async function paginate(url) {
        let res = await SpotaflyApi.paginate(url);
        setArtists(res.result);
        setSearchComplete(true);
    }

    function showArtists() {
        console.log("artists in show artists", artists)
        return (
            <div>
                <p className="lead numResults">Results {Number(artists.artists.offset)+1}-{Number(artists.artists.offset)+artists.artists.items.length} of {artists.artists.total}</p>
                <ArtistList artists={artists} paginate={paginate} />
            </div>
        )
    }

    if (!currentUser) {
        return <Redirect to="/login" />
    }


    return (
        
        <div className="GenreSearch mb-5">
            <h1 className="mt-3 mb-5">
                Search Artists in {genreName} Genre
            </h1>
            <SearchForm search={search} />
            
            {searchComplete ? showArtists(): <></>}
                
        </div>         
        
    );
}

export default GenreSearch;