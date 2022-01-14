const BASE_URL = "https://api.spotify.com/v1";
const axios = require("axios");
const stringify = require("qs-stringify");
const API_ACCESS_TOKEN = require("../config");

class Discover {

    static async getGenres() {
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_ACCESS_TOKEN
            }
        }
        const genres = await axios.get(`${BASE_URL}/recommendations/available-genre-seeds`, headers);
        
        return genres.data;
    }

    static async getNewReleases() {
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_ACCESS_TOKEN
            }
        }
        const newReleases = await axios.get(`${BASE_URL}/browse/new-releases`, headers);
        console.log("new releases", newReleases)
        console.log("new releases.data", newReleases.data)
        return newReleases.data;
    }

    static async getArtists(searchTerm) {
        console.log("Inside Discover.getArtists() BEFORE calling Spotify API")
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_ACCESS_TOKEN
            }
        }

        let url;

        if(searchTerm.length > 0) {
            const q = stringify(searchTerm);
            url = `${BASE_URL}/search?q=${q}&type=artist`;
        } else {
            url = `${BASE_URL}/search?type`
        }
        console.log("stringified", q);
        console.log("stringified again", stringify("Miles Davis"));
        const artists = await axios.get(`${BASE_URL}/search?q=${q}&type=artist`, headers);
        console.log("Inside Discover.getArtists() AFTER calling Spotify API")

        console.log("artists in Discover model getArtists() on backend", artists);
        return artists;
    }
}


module.exports = Discover;