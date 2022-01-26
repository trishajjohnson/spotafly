import React from "react";
import { Link } from "react-router-dom";
import "./ArtistCard.css";

function ArtistCard({artist}) {
    console.log("artist in ArtistCard", artist);
    return (
        
        <div className="ArtistCard">
            <Link className="artist-link" to={`/artists/${artist.id}`} >
                <img className="card-img-top artist-img" src={artist.images.length > 0 ?  artist.images[0].url : 'https://assets.audiomack.com/default-artist-image.png'} alt={artist.name} />
                <div className="AlbumCard-body card-body">  
                    <h6 className="card-title album-name">
                        {artist.name}
                    </h6>
                    <p className="card-text"><small>{artist.type}</small></p>
                </div>               
            </Link>
        </div>         
        
    );
}

export default ArtistCard;