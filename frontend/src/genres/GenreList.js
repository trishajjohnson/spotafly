import React from "react";
import GenreCard from "./GenreCard";
import "./GenreList.css";

/** Displays list of genres.
 *
 * Upon clicking on GenreCard, navigated to GenreSearch
 * component page to search artists by genre.
 *
 * This is routed to at /discover/genres
 *
 * Routes -> Discover -> GenreSelect -> GenreList -> GenreCard
 */

function GenreList({genres}) {

    return (
        
        <div className="container GenreList">
            <div className="row">
                {genres.map(g => (
                    <div className="col-md-2 genre-col mb-3">
                        <GenreCard genre={g} />
                    </div>
                ))}
            </div>
        </div>         
        
    );
}

export default GenreList;