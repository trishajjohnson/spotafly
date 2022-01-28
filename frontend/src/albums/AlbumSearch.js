import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";
import SpotaflyApi from "../api/api";
import AlbumList from "../albums/AlbumList";
import SearchForm from "../discover/SearchForm";
import "./AlbumSearch.css";

/** Album Search page.
 *
 * Renders SearchForm and displays search results.
 *
 * Routed at /discover/albums
 *
 * Routes -> AlbumSearch -> SearchForm -> AlbumList
 */

function AlbumSearch() {
    const { currentUser } = useContext(UserContext);
    const [albums, setAlbums] = useState(null);
    const [searchComplete, setSearchComplete] = useState(false);

    async function search(searchTerm) {
        setSearchComplete(false);
        let res = await SpotaflyApi.getAlbums(searchTerm);
        setAlbums(res.result.albums);
        setSearchComplete(true);
    }

    async function paginate(url) {
        let res = await SpotaflyApi.paginate(url);
        setAlbums(res.result.albums);
        setSearchComplete(true);
    }
 

    function showAlbums() {
        if(albums.items.length) {
            return (
                <div className="mt-5">
                    <p className="lead numResults">Results {Number(albums.offset)+1}-{Number(albums.offset)+albums.items.length} of {albums.total}</p>
                    <AlbumList albums={albums} paginate={paginate} />
                </div>
            );
        } else {
            return (
                <p className="lead">There are no results.</p>
            );
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