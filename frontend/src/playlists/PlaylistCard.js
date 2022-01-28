import React from "react";
import { Link } from "react-router-dom";
import "./PlaylistCard.css";

/** Shows limited information about a user's playlist.
 *
 * Is rendered by PlaylistList to show a "card" for each playlist.
 * Clicking on this card will navigate to individual playlist's
 * detail page.
 *
 * PlaylistList -> PlaylistCard
 */

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
                </div>            
            </Link>
        </div>         
        
    );
}

export default PlaylistCard;