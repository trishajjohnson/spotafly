import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SpotaflyApi from '../api/api';
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import { Dropdown, Modal, Button } from 'react-bootstrap';
import { Redirect, Link } from "react-router-dom";
import PlaylistList from "../playlists/PlaylistList";
import Alert from "../common/Alert";
import './UserProfile.css';

function UserProfile() {
    const { currentUser } = useContext(UserContext);
    const [playlists, setPlaylists] = useState(currentUser.playlists);
    console.log("currentUser.playlists", currentUser.playlists);
    const [formData, setFormData] = useState({
        playlist_name: "",
        img_url: "",
        username: currentUser.username
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(formData => ({
          ...formData,
          [name]: value
        }));
      };

    async function handleClick(evt) {
        const newPlaylist = await SpotaflyApi.createPlaylist(formData);
        console.log("newPlaylist", newPlaylist);
        setPlaylists([...playlists, newPlaylist]);
        setFormData({
            playlist_name: "",
            img_url: "",
            username: currentUser.username
        });
        handleClose();
    };

    // async function paginate(url) {
    //     setInfoLoaded(false);
    //     let res = await SpotaflyApi.paginate(url);
    //     console.log("res in paginate", res);
    //     // setPlaylists(res.result);
    //     setInfoLoaded(true);
    // }

    

    function showPlaylists() {
        
            return (
                <>
                    <PlaylistList playlists={playlists} />
                </>
            );
    }

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    return (
        <div>
            <div className="UserProfile">
                <img className="UserProfile-img mt-3 mb-3" src={currentUser.imgUrl} alt={currentUser.username} />
                <h1>{currentUser.firstName} {currentUser.lastName}</h1>
                
                <div>
                    <Button className="add-btn" onClick={handleShow}>
                        <i className="fas fa-plus"></i> New Playlist
                    </Button>
                    <Link className="btn UserProfile-btn m-1" to={`/profile/${currentUser.username}/edit`}>Edit Profile</Link>
                </div> 

                <Modal className="my-modal" show={show} onHide={handleClose} animation={false}>
                    <Modal.Body>
                        <Modal.Title>Create New Playlist</Modal.Title>
                        <div className="form-group">
                            <label for="playlist_name" className="form-label">Title</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            className="form-control input"
                            name="playlist_name"
                            value={formData.playlist_name} 
                            id="playlist_name" />
                        </div>
                        <div className="form-group">
                            <label for="img_url" className="form-label">Add Image (optional)</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            className="form-control input" 
                            name="img_url"
                            value={formData.img_url}
                            id="img_url" />
                        </div>
                        <div className="mt-3 btns">
                            <Button className="playlist-btn cancel" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button className="playlist-btn" onClick={handleClick}>
                                Add
                            </Button>

                        </div>
                    </Modal.Body>
                </Modal>
                <div className="mt-5">
                    <h2> Your Playlists</h2>
                    {showPlaylists()}
                </div>                   
            </div>  

            
        </div>
    );
}

export default UserProfile;