import React from "react";
import { Link } from "react-router-dom";
import "./CategoryCard.css";

/** Shows the name of a category to search music by.
 *
 * Is rendered by CategoriesList to show a "card" for each category.
 * Clicking on this card will navigate to search page corresponding
 * to the category.
 *
 * CategoriesList -> CategoryCard
 */

function CategoryCard({category}) {

    return (
        
        <div className="CategoryCard">
            <Link className="category-link" to={`/discover/${category.toLowerCase()}`} >
                <div className="CategoryCard-body">  
                    <h6 className="card-title category-name">
                        {category}
                    </h6>
                </div>            
            </Link>
        </div>         
        
    );
}

export default CategoryCard;