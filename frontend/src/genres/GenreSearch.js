import React, { useState, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import UserContext from "../auth/UserContext";
import SpotaflyApi from "../api/api";
import ArtistList from "../artists/ArtistList";
import SearchForm from "../discover/SearchForm";
import "./GenreSearch.css";

/** Genre Search page.
 *
 * Renders SearchForm and displays search results.
 *
 * Routed at /genres/:genre
 *
 * Routes -> GenreSearch -> GenreList
 */

function GenreSearch() {
    const genre = useParams().genre;
    const genreName = `${genre[0].toUpperCase()}${genre.slice(1)}`
    const { currentUser } = useContext(UserContext);
    const [artists, setArtists] = useState(null);
    const [searchComplete, setSearchComplete] = useState(false);

    async function search(searchTerm) {
        setSearchComplete(false);
        let res = await SpotaflyApi.getArtists(searchTerm, genre);
        setArtists(res.result);
        setSearchComplete(true);
    }

    async function paginate(url) {
        let res = await SpotaflyApi.paginate(url);
        setArtists(res.result);
        setSearchComplete(true);
    }

    function showArtists() {
        return (
            <div className="mt-5">
                <p className="lead numResults">Results {Number(artists.artists.offset)+1}-{Number(artists.artists.offset)+artists.artists.items.length} of {artists.artists.total}</p>
                <ArtistList artists={artists} paginate={paginate} />
            </div>
        );
    }

    if (!currentUser) return <Redirect to="/login" />


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