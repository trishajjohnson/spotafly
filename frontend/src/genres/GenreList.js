import React from "react";
import GenreCard from "./GenreCard";
import "./GenreList.css";

function GenreList({genres}) {
    console.log("genres passed to genreList", genres)

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