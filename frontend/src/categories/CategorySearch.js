import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, Redirect } from 'react-router-dom';
import UserContext from "../auth/UserContext";
import SearchForm from "./SearchForm";
import SpotaflyApi from "../api/api";
import GenreList from "../genres/GenreList";
import LoadingSpinner from "../common/LoadingSpinner";

function CategorySearch() {
    const { currentUser } = useContext(UserContext);
    const category = useParams().category;
    console.log("category", category)
    const [artists, setArtists] = useState(null);
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

    // function handleClick(evt) {
    //     evt.preventDefault();
    //     if(hasApplied(job.id)) return; 
    //     applyToJob(job.id);
    //     setApplied(true);
    // }

    async function chooseAndLoadCategorySearch() {
        if(category === "genres" && showGenrePreview) {
            const sample = genres.genres.slice(0,12);

            return (
                <div>
                    <GenreList genres={sample} />
                    <button className="btn loadMore-btn" onClick={() => setShowGenrePreview(false)}>Load more</button>
                </div>
            )
        } else if(category === "genres" && !showGenrePreview) {
            return (
                <div>
                    <GenreList genres={genres} />
                    <button className="btn loadMore-btn" onClick={() => setShowGenrePreview(true)}>Show less</button>
                </div>
            )
        } else if(category === "artists") {
            return (
                <div>
                    <div className="SearchForm p-5">
                        <SearchForm search={search} />
                    </div>
                </div>
            )
        }
    }


    async function search(searchTerm) {
        let res = await SpotaflyApi.getArtists(searchTerm);
        console.log("searching...");
        console.log(res);
        setArtists(res);
    }

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    if(!genres) return <LoadingSpinner />

    return (
        
        <div className="CategorySearch">
            <h1>{category}</h1>
            <div>
                {chooseAndLoadCategorySearch()}
            </div>
        </div>         
        
    );
}

export default CategorySearch;