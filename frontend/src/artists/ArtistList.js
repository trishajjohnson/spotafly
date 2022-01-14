import React from "react";
import ArtistCard from "./ArtistCard";
import "./ArtistList.css";

function ArtistList({artists}) {
    console.log("artists passed to ArtistList", artists)

    return (
        
        <div className="container ArtistList">
            <div className="row">
                {artists.map(a => (
                    <div className="col-md-2 genre-col mb-3">
                        <ArtistCard genre={a} />
                    </div>
                ))}
            </div>
        </div>         
        
    );
}

export default ArtistList;