import React, { useState } from "react";
import SongCard from "./SongCard";
import { Pagination } from 'react-bootstrap'; 
import "./SongList.css";

function SongList({songs, paginate}) {
    console.log("songs passed to SongList", songs);
    const numPages = Math.ceil(songs.total / 20);
    const [pages, setPages] = useState(Array.from({length: numPages}, (_, i) => i + 1));

    
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
                        <li className="page-item">
                            <a 
                                className="page-link pg-style" 
                                href="JavaScript:void(0);" 
                                tabIndex="-1" 
                                onClick={() => paginate(songs.previous)}>
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
                                onClick={() => paginate(`${songs.href.split("offset=")[0]}offset=${(p-1)*20}&limit=20`)}>
                                    {p}
                            </a>
                        </li>
                    ))}
                    {songs.next ? 
                        <li className="page-item">
                            <a 
                                className="page-link pg-style" 
                                href="JavaScript:void(0);"
                                onClick={() => paginate(songs.next)}>
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
            <Pagination>
                {songs.previous ? <Pagination.Prev onClick={() => paginate(songs.previous)} /> : <Pagination.Prev disabled />}
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                {songs.next ? <Pagination.Next onClick={() => paginate(songs.next)} /> : <Pagination.Next disabled />}
            </Pagination>
        </div>         
        
    );
}

export default SongList;