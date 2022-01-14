import React, { useState, useEffect, useContext } from "react";
import UserContext from "../auth/UserContext";
import { Redirect } from "react-router-dom";
import CategoriesList from "../categories/CategoriesList";
import "./Discover.css";


function Discover() {
    const { currentUser } = useContext(UserContext);
    const [categories, setCategories] = useState(["Artists", "Songs", "Albums", "Genres"]);


    if (!currentUser) {
        return <Redirect to="/login" />
    }

    return (
        
        <div className="Discover">
            <div className="Discover-genre-list">
                <h1 className="genre-section-header m-5">
                    Browse by Category
                </h1>
                <CategoriesList categories={categories} />                            
            </div>
        </div>         
        
    );
}

export default Discover;