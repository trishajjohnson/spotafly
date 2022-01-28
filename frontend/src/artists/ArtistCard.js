import React from "react";
import { Link } from "react-router-dom";
import "./ArtistCard.css";

/** Shows limited information about an artist.
 *
 * Is rendered by ArtistList to show a "card" for each artist.
 * Clicking on this card will navigate to individual artist's
 * profile page.
 *
 * ArtistList -> ArtistCard
 */

function ArtistCard({artist}) {

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