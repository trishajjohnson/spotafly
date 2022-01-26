import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SpotaflyApi from '../api/api';
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import { Redirect } from "react-router-dom";
import { Dropdown, Button, Modal } from 'react-bootstrap';
import './AlbumDetail.css';


function AlbumDetail() {
    const { currentUser, addToFavorites, removeFromFavorites, addToPlaylist } = useContext(UserContext);
    const [album, setAlbum] = useState(null);
    const [favoriteSongs, setFavoriteSongs] = useState(currentUser.favoriteSongs);
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
        async function getAlbumDetails() {
            let res = await SpotaflyApi.getAlbum(id);
            setAlbum(res);
        }
        getAlbumDetails();
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
            removeFromFavorites(evt.target.id, currentUser.username);
            let favs = favoriteSongs.filter(s => s !== evt.target.id);
            setFavoriteSongs(favs);
        } else {
            addToFavorites(evt.target.id, currentUser.username);
            setFavoriteSongs([...favoriteSongs, evt.target.id]);
        }
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
        console.log("addSong in AlbumDetail", addSong);
        setPlaylists([...playlists, newPlaylist]);
        setFormData({
            playlist_name: "",
            img_url: "",
            username: currentUser.username
        });
        handleClose();
    };

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

    if(!album) return <LoadingSpinner />;

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    return (

        <div>

            <div className="AlbumDetail">
                <img className="AlbumDetail-img m-5" src={album.images[0].url} alt={album.name} />
                <h1>{album.name}</h1>
                <p className="">{album.album_type.toUpperCase()}</p>
                <h3>{album.artists[0].name}</h3>
                <table className="table table-hover table-width">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th className="text-align" scope="col">TITLE</th>
                        <th scope="col"><i className="far fa-clock"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        
                        {createTableRows(album.tracks.items)}
                    </tbody>
                    </table>
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

export default AlbumDetail;

