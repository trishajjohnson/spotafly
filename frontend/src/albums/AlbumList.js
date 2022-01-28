import React from "react";
import AlbumCard from "./AlbumCard";
import "./AlbumList.css";

/** Show page with list of albums.
 *
 * On search in AlbumSearch, loads albums from API
 * in AlbumList component.
 *
 * This is routed to at /discover/albums
 *
 * Routes -> AlbumSearch -> { SearchForm, AlbumList } -> AlbumCard
 */

function AlbumList({albums, paginate}) {

    return (
        
        <div className="container AlbumList pt-3 pb-3">
            <div className="row">
                {albums.items.map(a => (
                    <div className="col-md-3 album-col mb-3">
                        <AlbumCard album={a} />
                    </div>
                ))}
            </div>
            <nav aria-label="Page navigation example mt-3">
                <ul className="pagination pagination-sm justify-content-center">
                    {albums.previous ? 
                        <li className="page-item m-2">
                            <a 
                                className="page-link pg-style" 
                                href="JavaScript:void(0);" 
                                tabIndex="-1" 
                                onClick={() => paginate(albums.previous)}>
                                    Previous
                            </a>
                        </li>
                        :
                        <li className="page-item m-2 disabled">
                            <a className="page-link pg-style" href="JavaScript:void(0);" tabIndex="-1">Previous</a>
                        </li>
                    }
                    
                    {albums.next ? 
                        <li className="page-item m-2">
                            <a 
                                className="page-link pg-style" 
                                href="JavaScript:void(0);"
                                onClick={() => paginate(albums.next)}>
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

export default AlbumList;