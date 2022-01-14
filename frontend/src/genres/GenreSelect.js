import React, { useState, useContext, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import UserContext from "../auth/UserContext";
import SpotaflyApi from "../api/api";
import GenreList from "./GenreList";
import LoadingSpinner from "../common/LoadingSpinner";
import "./GenreSelect.css";



function GenreSelect() {
    const { currentUser } = useContext(UserContext);
    const [genres, setGenres] = useState(null);
    const [showGenrePreview, setShowGenrePreview] = useState(true);

    useEffect(function loadGenres() {
        async function getGenres() {
            try {
                console.log("inside useEffect of Discover.js before SpotaflyApi call")
                const genreList = await SpotaflyApi.getGenres();
                console.log("genreList after SpotaflyApi call inside useEffect Discover.js", genreList)
                setGenres(genreList.genres);
                console.log("type of genres", typeof genres)
            } catch(e) {
                console.log(e);
            }
        }
        getGenres();
    }, []);

    function showSampleGenres() {
        const sample = genres.genres.slice(0,18);

        return (
            <div>
                <GenreList genres={sample} />
                <button className="btn loadMore-btn" onClick={() => setShowGenrePreview(false)}>Load more</button>
            </div>
        )
    } 

    function showGenres() {
        
        return (
            <div>
                <GenreList genres={genres.genres} />
                <button className="btn loadMore-btn" onClick={() => setShowGenrePreview(true)}>Show less</button>
            </div>
        )
    }

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    if(!genres) return <LoadingSpinner />


    return (
        
        <div className="GenreSearch">
            
            <h1 className="m-5">
                Browse by Genre
            </h1>
            {showGenrePreview ? showSampleGenres(): showGenres()}
                
        </div>         
        
    );
}

export default GenreSelect;