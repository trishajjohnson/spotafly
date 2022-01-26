import React, { useState } from "react";
import "./SearchForm.css";


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