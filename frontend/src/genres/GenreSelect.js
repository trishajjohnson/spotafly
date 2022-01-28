import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";
import SpotaflyApi from "../api/api";
import GenreList from "./GenreList";
import LoadingSpinner from "../common/LoadingSpinner";
import "./GenreSelect.css";

/** GenreSelect component rendered inside Discover component.
 *
 * Displays GenreList of GenreCards for user to narrow their search by.
 *
 * Routed at /discover/genres
 *
 * Routes -> Discover -> GenreSelect -> GenreList -> CategoryCard
 */

function GenreSelect() {
    const { currentUser } = useContext(UserContext);
    const [genres, setGenres] = useState(null);
    const [showGenrePreview, setShowGenrePreview] = useState(true);

    useEffect(function loadGenres() {
        async function getGenres() {
            try {
                const genreList = await SpotaflyApi.getGenres();
                setGenres(genreList.genres);
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
        );
    } 

    function showGenres() {
        
        return (
            <div>
                <GenreList genres={genres.genres} />
                <button className="btn loadMore-btn" onClick={() => setShowGenrePreview(true)}>Show less</button>
            </div>
        );
    }

    if (!currentUser) return <Redirect to="/login" />

    if(!genres) return <LoadingSpinner />

    return (
        
        <div className="GenreSearch">
            
            <h1 className="mt-3 mb-5">
                Browse by Genre
            </h1>
            {showGenrePreview ? showSampleGenres(): showGenres()}
                
        </div>         
        
    );
}

export default GenreSelect;