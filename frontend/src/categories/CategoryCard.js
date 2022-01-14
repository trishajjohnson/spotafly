import React from "react";
import { Link } from "react-router-dom";
import "./CategoryCard.css";

function CategoryCard({category}) {

    // function handleClick(evt) {
    //     evt.preventDefault();
    //     if(hasApplied(job.id)) return; 
    //     applyToJob(job.id);
    //     setApplied(true);
    // }

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