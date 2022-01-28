import React from "react";
import ArtistCard from "./ArtistCard";
import "./ArtistList.css";

/** Show page with list of artists.
 *
 * On search in ArtistSearch, loads artists from API
 * in ArtistList component.
 *
 * This is routed to at /discover/artists
 *
 * Routes -> ArtistSearch -> { SearchForm, ArtistList } -> ArtistCard
 */

function ArtistList({artists, paginate}) {
    
    return (
        
        <div className="container ArtistList mt-3">
            <div className="row">
                {artists.artists.items.map(a => (
                    <div className="col-md-3 genre-col mb-3">
                        <ArtistCard artist={a} />
                    </div>
                ))}
            </div>
            <nav className="mt-3" aria-label="Page navigation example">
                <ul className="pagination pagination-sm justify-content-center">
                    {artists.artists.previous ? 
                        <li className="page-item m-2">
                            <a 
                                className="page-link pg-style" 
                                href="JavaScript:void(0);" 
                                tabIndex="-1" 
                                onClick={() => paginate(artists.artists.previous)}>
                                    Previous
                            </a>
                        </li>
                        :
                        <li className="page-item m-2 disabled">
                            <a className="page-link pg-style" href="JavaScript:void(0);" tabIndex="-1">Previous</a>
                        </li>
                    }
                
                    {artists.artists.next ? 
                        <li className="page-item m-2">
                            <a 
                                className="page-link pg-style" 
                                href="JavaScript:void(0);"
                                onClick={() => paginate(artists.artists.next)}>
                                    Next
                            </a>
                        </li>
                        :
                        <li className="page-item m-2 disabled">
                            <a className="page-link pg-style" href="JavaScript:void(0);" tabIndex="-1">Next</a>
                        </li>
                    }
                </ul>
            </nav>
        </div>         
        
    );
}

export default ArtistList;