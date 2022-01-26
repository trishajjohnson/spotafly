import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";
import SpotaflyApi from "../api/api";
// import ArtistList from "../artists/ArtistList";
import AlbumList from "../albums/AlbumList";
import LoadingSpinner from "../common/LoadingSpinner";
import SearchForm from "../discover/SearchForm";
import "./AlbumSearch.css";



function AlbumSearch() {
    const { currentUser } = useContext(UserContext);
    const [albums, setAlbums] = useState(null);
    const [searchComplete, setSearchComplete] = useState(false);

    async function search(searchTerm) {
        setSearchComplete(false);
        let res = await SpotaflyApi.getAlbums(searchTerm);
        console.log("searching...");
        console.log("result from search function in AlbumSearch.js", res.result);
        console.log("result from search function in AlbumSearch.js", res.result.albums);
        setAlbums(res.result.albums);
        setSearchComplete(true);
    }

    async function paginate(url) {
        // setSearchComplete(false);
        let res = await SpotaflyApi.paginate(url);
        setAlbums(res.result.albums);
        setSearchComplete(true);
    }
 

    function showAlbums() {
        console.log("albums.href in AlbumSearch", albums.href);
        console.log("edited url string", `${albums.href.split("offset=")[0]}offset=${(20-1)*20}&limit=20`);
        if(albums.items.length) {
            return (
                <div className="">
                    <p className="lead numResults">Results {Number(albums.offset)+1}-{Number(albums.offset)+albums.items.length} of {albums.total}</p>
                    <AlbumList albums={albums} paginate={paginate} />
                </div>
            )
        } else {
            return (
                <p className="lead">There are no results.</p>
            )
        }
    }

    if (!currentUser) return <Redirect to="/login" />


    return (
        
        <div className="AlbumSearch">
            <h1 className="mt-3 mb-5">
                Search Albums
            </h1>
            <SearchForm search={search} />
            
            {searchComplete ? showAlbums(): <></>}
                
        </div>         
        
    );
}

export default AlbumSearch;