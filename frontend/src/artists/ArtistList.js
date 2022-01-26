import React, { useState } from "react";
import ArtistCard from "./ArtistCard";
import "./ArtistList.css";

function ArtistList({artists, paginate}) {
    console.log("artists passed to ArtistList", artists);
    const numPages = Math.ceil(artists.artists.total / 20);
    const [pages, setPages] = useState(Array.from({length: numPages}, (_, i) => i + 1));

    
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
                        <li className="page-item">
                            <a 
                                className="page-link pg-style" 
                                href="JavaScript:void(0);" 
                                tabIndex="-1" 
                                onClick={() => paginate(artists.artists.previous)}>
                                    Previous
                            </a>
                        </li>
                        :
                        <li className="page-item disabled">
                            <a className="page-link pg-style" href="JavaScript:void(0);" tabIndex="-1">Previous</a>
                        </li>
                    }
                    {pages.map(p => (
                        <li className="page-item">
                            <a 
                                className="page-link pg-style" 
                                href="JavaScript:void(0);"
                                onClick={() => paginate(`${artists.artists.href.split("offset=")[0]}offset=${(p-1)*20}&limit=20`)}>
                                    {p}
                            </a>
                        </li>
                    ))}
                    {artists.artists.next ? 
                        <li className="page-item">
                            <a 
                                className="page-link pg-style" 
                                href="JavaScript:void(0);"
                                onClick={() => paginate(artists.artists.next)}>
                                    Next
                            </a>
                        </li>
                        :
                        <li className="page-item disabled">
                            <a className="page-link pg-style" href="JavaScript:void(0);" tabIndex="-1">Next</a>
                        </li>
                    }
                </ul>
            </nav>
        </div>         
        
    );
}

export default ArtistList;