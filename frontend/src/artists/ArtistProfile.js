import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SpotifyApi from '../api/api';
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import { Redirect } from "react-router-dom";
import './CompanyDetail.css';

function ArtistProfile() {
    const { currentUser } = useContext(UserContext);
    const [artist, setArtist] = useState(null);
    const {id} = useParams();
    console.log(id);
    
    
    useEffect(() => {
        async function getArtistDetails() {
            // console.log("before AJAX call")
            let res = await SpotifyApi.getArtist(id);
            console.log("res", res);
            setArtist(res);
        }
        getArtistDetails();
    }, []);
    

    if(!company) return <LoadingSpinner />;

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    return (

        <div>

            <div className="CompanyDetail">
                <h4>{company.name}</h4>
                <p>{company.description}</p>
                <div className="JobsList">  
                    <JobCardList jobs={company.jobs} /> 
                </div>                
            </div> 

        </div>
        
    );
}

export default CompanyDetail;