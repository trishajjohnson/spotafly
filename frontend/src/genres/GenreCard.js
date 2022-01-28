import React from "react";
import { Link } from "react-router-dom";
import "./GenreCard.css";

/** Card displays each individual genre available for searching.
 *
 * Is rendered by GenreList to show a "card" for each genre.
 * Clicking on this card will navigate to a search for that will
 * filter artists by genre.
 *
 * GenreList -> GenreCard
 */

function GenreCard({genre}) {

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