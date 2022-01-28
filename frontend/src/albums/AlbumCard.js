import React from "react";
import { Link } from "react-router-dom";
import "./AlbumCard.css";

/** Shows limited information about an album.
 *
 * Is rendered by AlbumList to show a "card" for each album.
 * Clicking on this card will navigate to individual album's
 * detail page.
 *
 * AlbumList -> AlbumCard
 */

function AlbumCard({album}) {

    return (
        
        <div className="AlbumCard card">
            <Link className="album-link" to={`/albums/${album.id}`} >
                <img className="card-img-top album-img" src={album.images.length > 0 ? album.images[0].url : "https://3.bp.blogspot.com/-7xM__hxy--I/T5QRMswV4gI/AAAAAAAAFMA/lEusxPimxv0/s1600/mediaplaybackactivity1.png"} alt={album.name} />
                <div className="AlbumCard-body card-body">  
                    <h6 className="card-title album-name">
                        {album.name}
                    </h6>
                    <p className="card-text album-type"><small>{album.album_type}</small></p>
                    <p className="card-text">{album.artists[0].name}</p>
                </div>            
            </Link>
        </div>         
        
    );
}

export default AlbumCard;