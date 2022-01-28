import React, { useState } from "react";
import "./SearchForm.css";

/** Search form component.
 *
 * Appears on AlbumSearch, ArtistSearch, SongSearch and GenreSearch.
 * Used to filter user's search by searchTerm.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `search` function prop that runs in a parent to do the
 * searching.
 *
 * { AlbumSearch, ArtistSearch, SongSearch, GenreSearch } -> SearchForm
 */

function SearchForm({search}) {
    const [searchTerm, setSearchTerm] = useState("");
    
    const handleChange = evt => {
    setSearchTerm(evt.target.value);
    };
    
    function handleSubmit(evt) {
        evt.preventDefault();
        search(searchTerm.trim() || undefined);
        setSearchTerm("");
    }

    return (
        <div>
            <form className="form-inline" onSubmit={handleSubmit}>
                <div className="form-group form-input">
                    <input
                        className="form-control search-input"
                        onChange={handleChange}
                        type="text" 
                        value={searchTerm}
                        placeholder="Artists, songs or albums"
                    />
                </div>
                <div className="btn-div">
                    <button className="btn searchForm-btn"><i className="fas fa-search icon"></i></button>
                </div>
            </form>
        </div>
    );
}

export default SearchForm;