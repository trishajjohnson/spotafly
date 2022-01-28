import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SpotaflyApi from '../api/api';
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import { Dropdown, Button, Modal } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import AlbumList from "../albums/AlbumList";
import './ArtistProfile.css';

/** Artist Profile page.
 *
 * Renders information about artist, along with their top 10 songs
 * and albums.
 *
 * Routed at /artists/:id
 *
 * Routes -> ArtistProfile -> AlbumList
 */

function ArtistProfile() {
    const { currentUser, addToFavorites, removeFromFavorites, addToPlaylist } = useContext(UserContext);
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState(null);
    const [topSongs, setTopSongs] = useState(null);
    const [favoriteSongs, setFavoriteSongs] = useState(currentUser.favoriteSongs);
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [playlists, setPlaylists] = useState(currentUser.playlists);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        playlist_name: "",
        img_url: "",
        username: currentUser.username
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [songIdToAdd, setSongIdToAdd] = useState("");
    
    
    useEffect(() => {
        async function getArtistDetails() {
            let res = await SpotaflyApi.getArtist(id);
            setArtist(res);
        }
        getArtistDetails();
    }, [id]);

    useEffect(() => {
        async function getArtistTopSongsAndAlbums() {
            const topSongs = await SpotaflyApi.getArtistTopSongs(id);
            const albums = await SpotaflyApi.getArtistAlbums(id);
            setTopSongs(topSongs.tracks);
            setAlbums(albums);
            setInfoLoaded(true);
        }
        getArtistTopSongsAndAlbums();
    }, [id]);
    
    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(formData => ({
          ...formData,
          [name]: value
        }));
    };

    function handleHeartClick(evt) {
        if(favoriteSongs.includes(evt.target.id)) {
            removeFromFavorites(evt.target.id);
            let favs = favoriteSongs.filter(s => s !== evt.target.id);
            setFavoriteSongs(favs);
        } else {
            addToFavorites(evt.target.id, currentUser.username);
            setFavoriteSongs([...favoriteSongs, evt.target.id]);
        }
    }

    async function paginate(url) {
        setInfoLoaded(false);
        let res = await SpotaflyApi.paginate(url);
        setAlbums(res.result);
        setInfoLoaded(true);
    }

    function handleCreateNew(evt) {
        setSongIdToAdd(evt.target.getAttribute("data-songid"));
        handleShow();
    }

    async function handleAddClick(evt) {
        const songId = evt.target.getAttribute("data-songid");
        const playlistId = evt.target.getAttribute("data-playlistid");
        await addToPlaylist(songId, playlistId);
    }

    async function createNewAndAddToPlaylist(evt) {
        const newPlaylist = await SpotaflyApi.createPlaylist(formData);
        const addSong = await addToPlaylist(songIdToAdd, newPlaylist.playlist_id);
        setPlaylists([...playlists, newPlaylist]);
        currentUser.playlists = [...playlists, newPlaylist];
        setFormData({
            playlist_name: "",
            img_url: "",
            username: currentUser.username
        });
        handleClose();
    };

    function createTableRows(tracks) {
        const rows = [];
        for(let i=0; i<tracks.length; i++) {
            rows.push(createRow(tracks[i], i+1));
        }

        return rows;
    }

    function createRow(track, trackNum){
        const ms = track.duration_ms;
        const mins = Math.floor((ms/1000/60) << 0);
        const secs = Math.floor((ms/1000) % 60);
        const trackTime = `${mins}:${(secs < 10 ? '0' : '') + secs} `;

        return (
            <tr className="track-row">
                <th scope="row">{trackNum}</th>
                <td className="text-align">{track.name}</td>
                <td>
                    {favoriteSongs.includes(track.id) ?
                        (
                            <i onClick={handleHeartClick} id={track.id} className="fas fa-heart fav"></i>
                        ) : 
                        (
                            <i onClick={handleHeartClick} id={track.id} className="far fa-heart add-fav"></i>
                        )
                    }
                    {trackTime}
                    <Dropdown className="dropdown-btn">
                        <Dropdown.Toggle className="drop-btn" id="dropdown-basic">
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item onClick={handleCreateNew} data-songid={track.id} href="JavaScript:void(0);">Add to new playlist</Dropdown.Item>
                            <Dropdown.Divider />
                            {playlists.map(p => (
                                <Dropdown.Item data-songid={track.id} data-playlistid={p.playlist_id} onClick={handleAddClick} href="JavaScript:void(0);">{p.playlist_name}</Dropdown.Item>
                            ))}                            
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        );
    }

    function showAlbums() {
        if(albums.items.length) {
            return (
                <>
                    <AlbumList albums={albums} paginate={paginate} />
                </>
            );
        } else {
            return (
                <p className="lead">There are no results.</p>
            );
        }
    }

    if(!artist) return <LoadingSpinner />;

    if (!currentUser) return <Redirect to="/login" />

    return (

        <div>

            <div className="ArtistProfile">
                <img className="ArtistProfile-img mt-5 mb-3" src={artist.images[0].url} alt={artist.name} />
                <h1>{artist.name}</h1>
                <div>
                    <h2 className="mt-5">Top 10 Songs</h2>
                    <table className="table table-hover table-width">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th className="text-align" scope="col">TITLE</th>
                            <th scope="col"><i className="far fa-clock"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {topSongs ? createTableRows(topSongs) : <></>}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2 className="mt-5">Albums</h2>
                    {infoLoaded ? showAlbums() : <></>}
                </div>                   
            </div> 

            <Modal className="my-modal" show={show} onHide={handleClose} animation={false}>
                <Modal.Body>
                    <Modal.Title>Create New Playlist</Modal.Title>
                        <div className="form-group">
                            <label htmlFor="playlist_name" className="form-label">Title</label>
                            <input 
                                onChange={handleChange}
                                type="text" 
                                className="form-control input"
                                name="playlist_name"
                                value={formData.playlist_name} 
                                id="playlist_name" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="img_url" className="form-label">Add Image (optional)</label>
                            <input 
                                onChange={handleChange}
                                type="text" 
                                className="form-control input" 
                                name="img_url"
                                value={formData.img_url}
                                id="img_url" 
                            />
                        </div>
                    <div className="mt-3 btns">
                        <Button className="playlist-btn cancel" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button className="playlist-btn" onClick={createNewAndAddToPlaylist}>
                            Add
                        </Button>

                    </div>
                </Modal.Body>
            </Modal>

        </div>
        
    );
}

export default ArtistProfile;