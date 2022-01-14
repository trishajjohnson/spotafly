import React from "react";
import CategoryCard from "./CategoryCard";
import "./CategoriesList.css";

function CategoriesList({categories}) {
    
    // function handleClick(evt) {
    //     evt.preventDefault();
    //     if(hasApplied(job.id)) return; 
    //     applyToJob(job.id);
    //     setApplied(true);
    // }

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