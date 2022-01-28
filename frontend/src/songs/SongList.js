import React from "react";
import SongCard from "./SongCard";
import "./SongList.css";

/** Show list of SongCard elements.
 *
 * On search in SongSearch, loads songs from API
 * in SongList component.
 *
 * This is routed to at /discover/songs
 *
 * Routes -> SongSearch -> { SearchForm, SongList } -> SongCard
 */

function SongList({songs, paginate}) {
    
    return (
        
        <div className="container SongList mt-3">
            <div className="row">
                {songs.items.map(s => (
                    <div className="col-md-3 song-col mb-3">
                        <SongCard song={s} />
                    </div>
                ))}
            </div>
            <nav className="mt-3" aria-label="Page navigation example">
                <ul className="pagination pagination-sm justify-content-center">
                    {songs.previous ? 
                        <li className="page-item m-2">
                            <a 
                                className="page-link pg-style" 
                                href="JavaScript:void(0);" 
                                tabIndex="-1" 
                                onClick={() => paginate(songs.previous)}>
                                    Previous
                            </a>
                        </li>
                        :
                        <li className="page-item m-2 disabled">
                            <a className="page-link pg-style" href="JavaScript:void(0);" tabIndex="-1">Previous</a>
                        </li>
                    }
                    
                    {songs.next ? 
                        <li className="page-item m-2">
                            <a 
                                className="page-link pg-style" 
                                href="JavaScript:void(0);"
                                onClick={() => paginate(songs.next)}>
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

export default SongList;