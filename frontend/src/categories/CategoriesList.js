import React from "react";
import CategoryCard from "./CategoryCard";
import "./CategoriesList.css";

/** Displays list of categories to search music by inside Discover component.
 *
 * On selection of category, user is navigated to discover/:category.
 *
 * This is routed to /discover
 *
 * Routes -> Discover -> CategoriesList -> CategoryCard
 */

function CategoriesList({categories}) {

    return (
        
        <div className="container CategoriesList">
            <div className="row">
                {categories.map(c => (
                    <div className="col-md-3 category-col">
                        <CategoryCard category={c} />
                    </div>
                ))}
            </div>
        </div>         
        
    );
}

export default CategoriesList;