import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SpotaflyApi from '../api/api';
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import { Redirect, useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';
import './PlaylistDetail.css';

/** Playlist Detail page.
 *
 * Renders information about playlist, along with the songs that 
 * belong to it.
 *
 * Routed at /playlists/:id
 *
 * Routes -> PlaylistDetail
 */

function PlaylistDetail() {
    const { currentUser, removeFromPlaylist, deletePlaylist } = useContext(UserContext);
    const [playlist, setPlaylist] = useState(null);
    const [tracks, setTracks] = useState(null);
    const { id } = useParams();
    const history = useHistory();
    
    
    useEffect(() => {
        async function getPlaylistDetails() {
            const playlist = await SpotaflyApi.getPlaylist(id, currentUser.username);
            setPlaylist(playlist.playlist);
            if(playlist.playlist.tracks.length > 0) {
                const result = await SpotaflyApi.getTracks(playlist.playlist.tracks.join(','));
                setTracks(result.tracks); 
            } else {
                setTracks([]);
            }
        }
        getPlaylistDetails();
    }, [id]);
    
    async function handleDelete(evt) {
        await deletePlaylist(playlist.playlist_id);
        history.push(`/profile/${currentUser.username}`);
    }

    async function handleClick(evt) {
        await removeFromPlaylist(evt.target.id, playlist.playlist_id);
        setTracks(tracks.filter(t => t.id !== evt.target.id));
    }

    function createTableRows(tracks) {
        let rows = [];
        for(let i=0; i<tracks.length; i++) {
            const row = createRow(tracks[i]);
            rows.push(row);
        }
        return rows;
    }

    function createRow(track){
        const ms = track.duration_ms;
        const mins = Math.floor((ms/1000/60) << 0);
        const secs = Math.floor((ms/1000) % 60);
        const trackTime = `${mins}:${(secs < 10 ? '0' : '') + secs} `;

        return (
            <tr className="track-row">
                <th scope="row">{track.track_number}</th>
                <td className="text-align">{track.name}</td>
                <td>
                    {trackTime}
                    <i onClick={handleClick} id={track.id} className="far fa-trash-alt remove"></i>
                </td>
            </tr>
        );
    }

    if (!currentUser) return <Redirect to="/login" />
    if(!playlist) return <LoadingSpinner />;
    if(!tracks) return <LoadingSpinner />;

    return (

        <div>

            <div className="PlaylistDetail">
                <img className="PlaylistDetail-img m-5" src={playlist.img_url} alt={playlist.playlist_name} />
                <h1>{playlist.playlist_name}</h1>
                <p className="">playlist</p>
                <h3>by {playlist.username}</h3>
                {playlist.playlist_name !== "Favorite Songs" ?
                    (
                        <div className="mb-3">
                            <Button className="delete-btn" onClick={handleDelete}>
                                Delete Playlist
                            </Button>
                        </div>
                    ) : (
                        <></>
                    )}
                {tracks.length > 0 ? (
                    <table className="table table-hover table-width">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th className="text-align" scope="col">TITLE</th>
                            <th scope="col"><i className="far fa-clock"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {createTableRows(tracks)}
                        </tbody>
                    </table>
                ): (
                    <>
                        <hr className="hr" />
                        <div className="m-5 lead">You haven't added any songs to this playlist yet.</div>
                    </>
                )}
                </div> 

        </div>
        
    );
}

export default PlaylistDetail;

