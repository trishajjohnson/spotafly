import React from "react";
import { Link } from "react-router-dom";
import "./ArtistCard.css";

function ArtistCard({artist}) {
    console.log("artist in ArtistCard", artist);
    return (
        
        <div className="ArtistCard">
            <Link className="artist-link" to={`/artists/${artist.id}`} >
                <div className="ArtistCard-body">  
                    <h6 className="card-title artist-name">
                        {artist.name}
                    </h6>
                </div>            
            </Link>
        </div>         
        
    );
}

export default ArtistCard;