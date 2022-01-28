import React from "react";
import PlaylistCard from "./PlaylistCard";
import "./PlaylistList.css";

/** Displays list of playlistCard elements on user profile page.
 *
 * This is routed to at /users/:username
 *
 * Routes -> UserProfile -> PlaylistList -> PlaylistCard
 */

function PlaylistList({playlists}) {

    return (
        
        <div className="container PlaylistList pt-3 pb-3">
            <div className="row">
                {playlists.map(p => (
                    <div className="col-md-3 playlist-col mb-3">
                        <PlaylistCard playlist={p} />
                    </div>
                ))}
            </div>
        </div>         
    );
}

export default PlaylistList;