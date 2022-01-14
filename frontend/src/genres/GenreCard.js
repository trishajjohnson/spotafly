import React from "react";
import { Link } from "react-router-dom";
import "./GenreCard.css";

function GenreCard({genre}) {

    // function handleClick(evt) {
    //     evt.preventDefault();
    //     if(hasApplied(job.id)) return; 
    //     applyToJob(job.id);
    //     setApplied(true);
    // }

    return (
        
        <div className="GenreCard">
            <Link className="genre-link" to={`/genres/${genre}`} >
                <div className="GenreCard-body">  
                    <h6 className="card-title genre-name">
                        {genre.toUpperCase()}
                    </h6>
                </div>            
            </Link>
        </div>         
        
    );
}

export default GenreCard;