import React from "react";
import { Link } from "react-router-dom";
import "./SongCard.css";

/** Shows limited information about a song.
 *
 * Is rendered bySongList to show a "card" for each song.
 * Clicking on this card will navigate to the album's detail 
 * page to which the individual song belongs.
 *
 * SongList -> SongCard
 */

function SongCard({song}) {

    return (
        
        <div className="SongCard card">
            <Link className="song-link" to={`/albums/${song.album.id}`} >
                <img className="card-img-top song-img" src={song.album.images.length > 0 ? song.album.images[0].url : "https://us.123rf.com/450wm/soloviivka/soloviivka1606/soloviivka160600001/59688426-music-note-vector-icon-white-on-black-background.jpg?ver=6"} alt={song.name} />
                <div className="SongCard-body card-body">  
                    <h6 className="card-title album-name">
                        {song.name}
                    </h6>
                    <p className="card-text song-type"><small>{song.type}</small></p>
                    <p className="card-text">{song.artists[0].name}</p>
                </div>            
            </Link>
        </div>         
        
    );
}

export default SongCard;