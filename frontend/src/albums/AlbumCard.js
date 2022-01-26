import React from "react";
import { Link } from "react-router-dom";
import "./AlbumCard.css";

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