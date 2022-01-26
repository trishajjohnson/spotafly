import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";
import "./PlaylistCard.css";

function PlaylistCard({playlist}) {

    return (
        
        <div className="PlaylistCard card">
            <Link className="playlist-link" to={`/playlists/${playlist.playlist_id}`} >
                <img className="card-img-top playlist-img" src={playlist.img_url} alt={playlist.playlist_name} />
                <div className="PlaylistCard-body card-body">  
                    <h6 className="card-title playlist-name">
                        {playlist.playlist_name}
                    </h6>
                    <p className="card-text playlist-type"><small>playlist</small></p>
                    {/* <p className="card-text">{album.artists[0].name}</p> */}
                </div>            
            </Link>
        </div>         
        
    );
}

export default PlaylistCard;