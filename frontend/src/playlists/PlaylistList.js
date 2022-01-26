import React, { useState } from "react";
import PlaylistCard from "./PlaylistCard";
import "./PlaylistList.css";

function PlaylistList({playlists}) {
    console.log("playlists passed to PlaylistList", playlists);
    // const numPages = Math.ceil(albums.total / 20);
    // console.log("numPages", numPages)
    // const [pages, setPages] = useState(Array.from({length: numPages}, (_, i) => i + 1));

    return (
        
        <div className="container PlaylistList pt-3 pb-3">
            <div className="row">
                {playlists.map(p => (
                    <div className="col-md-3 playlist-col mb-3">
                        <PlaylistCard playlist={p} />
                    </div>
                ))}
            </div>
            {/* <nav aria-label="Page navigation example mt-3">
                <ul className="pagination pagination-sm justify-content-center">
                    {albums.previous ? 
                        <li className="page-item">
                            <a 
                                className="page-link pg-style" 
                                href="JavaScript:void(0);" 
                                tabIndex="-1" 
                                onClick={() => paginate(albums.previous)}>
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
                                onClick={() => paginate(`${albums.href.split("offset=")[0]}offset=${(p-1)*20}&limit=20`)}>
                                    {p}
                            </a>
                        </li>
                    ))}
                    {albums.next ? 
                        <li className="page-item">
                            <a 
                                className="page-link pg-style" 
                                href="JavaScript:void(0);"
                                onClick={() => paginate(albums.next)}>
                                    Next
                            </a>
                        </li>
                        :
                        <li className="page-item disabled">
                            <a className="page-link pg-style" href="JavaScript:void(0);" tabIndex="-1">Next</a>
                        </li>
                    }
                </ul>
            </nav> */}
        </div>         
    );
}

export default PlaylistList;