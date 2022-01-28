import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import { Redirect } from "react-router-dom";
import CategoriesList from "../categories/CategoriesList";
import "./Discover.css";

/** Discover music page.
 *
 * Renders CategoriesList for user's to narrow their search by.
 *
 * Routed at /discover
 *
 * Routes -> Discover -> CategoriesList -> CategoryCard
 */

function Discover() {
    const { currentUser } = useContext(UserContext);
    const [categories, setCategories] = useState(["Artists", "Songs", "Albums", "Genres"]);


    if (!currentUser) {
        return <Redirect to="/login" />
    }

    return (
        
        <div className="Discover">
            <div className="Discover-genre-list">
                <h1 className="genre-section-header mt-3 mb-5">
                    Browse by Category
                </h1>
                <CategoriesList categories={categories} />                            
            </div>
        </div>         
        
    );
}

export default Discover;