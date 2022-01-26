const BASE_URL = "https://api.spotify.com/v1";
const axios = require("axios");
const { BadRequestError } = require("../expressError");

class Discover {

    static async paginate(url) {
        console.log("inside paginate of Discover model BEFORE calling Spotify API");
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_ACCESS_TOKEN
            }
        }

        const res = await axios.get(url, headers);
        console.log("inside paginate of Discover model AFTER calling Spotify API");
        return res.data;
    }

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

        return newReleases.data;
    }


    // Fetching Artist(s) data from Spotify API

    static async getArtists(searchTerm, genre) {
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_ACCESS_TOKEN
            }
        }

        let url;
        let q;
        if(searchTerm.length > 0) {
            let terms = searchTerm.split(' ');
            if(terms.length > 1) {
                terms = terms.join('%20')
            } else {
                terms = terms.join('');
            }

            if(genre.length > 0){
                q = `artist:${terms}%20genre:${genre}`;
            } else {
                q = `artist:${terms}`;
            }
            url = `${BASE_URL}/search?q=${q}&type=artist`;
        } else {
            throw new BadRequestError("Search term must be at least 1 character long");
        }

        const res = await axios.get(url, headers);

        return res.data;
    }

    static async getArtist(id) {
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_ACCESS_TOKEN
            }
        }

        const artist = await axios.get(`${BASE_URL}/artists/${id}`, headers);

        return artist.data;
    }

    static async getArtistAlbums(id) {
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_ACCESS_TOKEN
            }
        }

        const albums = await axios.get(`${BASE_URL}/artists/${id}/albums`, headers);

        return albums.data;
    }

    static async getArtistTopTracks(id) {
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_ACCESS_TOKEN
            }
        }

        const topTracks = await axios.get(`${BASE_URL}/artists/${id}/top-tracks?country=us`, headers);

        return topTracks.data;
    }


    // Fetching Album(s) data from Spotify API

    static async getAlbums(searchTerm) {
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_ACCESS_TOKEN
            }
        }

        let url;
        let q;
        if(searchTerm.length > 0) {
            let terms = searchTerm.split(' ');
            if(terms.length > 1) {
                terms = terms.join('%20')
            } else {
                terms = terms.join('');
            }
            q = `album:${terms}`;
            
            url = `${BASE_URL}/search?q=${q}&type=album`;
        } else {
            throw new BadRequestError("Search term must be at least 1 character long");
        }

        const res = await axios.get(url, headers);

        return res.data;
    }

    static async getAlbum(id) {
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_ACCESS_TOKEN
            }
        }

        const album = await axios.get(`${BASE_URL}/albums/${id}`, headers);

        return album.data;
    }


    // Fetching Songs data from Spotify API

    static async getSongs(searchTerm) {
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_ACCESS_TOKEN
            }
        }

        let url;
        let q;
        if(searchTerm.length > 0) {
            let terms = searchTerm.split(' ');
            if(terms.length > 1) {
                terms = terms.join('%20')
            } else {
                terms = terms.join('');
            }
            q = `track:${terms}`;
            
            url = `${BASE_URL}/search?q=${q}&type=track`;
        } else {
            throw new BadRequestError("Search term must be at least 1 character long");
        }

        const res = await axios.get(url, headers);
        console.log("res from Spotify API in getSongs disocver model", res.data);
        return res.data;
    }

    // Fetching several tracks from Spotify API using string of ids

    static async getSeveralTracks(ids) {
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_ACCESS_TOKEN
            }
        }

        const url = `https://api.spotify.com/v1/tracks?ids=${ids}`;

        const res = await axios.get(url, headers);

        return res.data;
    }
}


module.exports = Discover;