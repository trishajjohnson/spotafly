import React, { useState, useContext, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import UserContext from "../auth/UserContext";
import SpotaflyApi from "../api/api";
import ArtistList from "../artists/ArtistList";
import LoadingSpinner from "../common/LoadingSpinner";
import SearchForm from "../discover/SearchForm";
import "./GenreSearch.css";



function GenreSearch() {
    const genre = useParams().genre;
    console.log("genre", genre);
    const { currentUser } = useContext(UserContext);
    const [artists, setArtists] = useState(null);
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
    }, [genre]);

    async function search(searchTerm) {
        let res = await SpotaflyApi.getArtists(searchTerm);
        console.log("searching...");
        console.log("result from search function in GenreSearch.js", res);
        setArtists(res);
    }

    function showNewReleases() {
        const sample = newReleases.items.slice(0,18);
        sample.map(r => console.log("new release", r))

        return (
            <div>
                <ArtistList newReleases={sample} />
                {/* <button className="btn loadMore-btn" onClick={() => setShowListPreview(false)}>Load more</button> */}
            </div>
        )
    } 

    function showArtists() {
        
        return (
            <div>
                <ArtistList genres={artists.artists} />
                {/* <button className="btn loadMore-btn" onClick={() => setShowListPreview(true)}>Show less</button> */}
            </div>
        )
    }

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    if(!newReleases) return <LoadingSpinner />


    return (
        
        <div className="GenreSearch">
            <h1 className="m-5">
                Artists in {genre}
            </h1>
            <SearchForm search={search} />
            {searchComplete ? showArtists(): showNewReleases()}
                
        </div>         
        
    );
}

export default GenreSearch;