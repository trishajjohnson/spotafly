import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 *
 */

class SpotaflyApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {

    const url = `${BASE_URL}/${endpoint}`;
    let headers;
    if(!this.token){
      headers = {};
    } else {
      headers = { Authorization: `Bearer ${SpotaflyApi.token}` };
    }
    const params = (method === "get")
        ? data
        : {};

    try {
      console.log("{ url, data, method, params, headers }", { url, data, method, params, headers });
      const result = await axios({ url, data, method, params, headers });
      return result.data;
    } catch (err) {
      console.log("err in api", err)
      console.error("API Error:", err);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // Get New Releases

  static async getNewReleases() {
    let res = await this.request(`discover/new-releases`);
    
    console.log("res in geNewReleases() api.js", res.newReleases)
    return res.newReleases;
  }
  // Get all genres

  static async getGenres() {
    console.log("inside getGenres() of SpotaflyApi BEFORE calling backend")
    let res = await this.request(`discover/genres`);
    console.log("inside getGenres() of SpotaflyApi AFTER calling backend")
    console.log("res in getGenres() api.js", res)
    return res;
  }

  /** Get artists (filtered by searchTerm) */

  static async getArtists(searchTerm, genre="") {
    console.log("inside SpotaflyApi.getArtists BEFORE api call")
    let res = await this.request("discover/artists", { searchTerm, genre });
    console.log("inside SpotaflyApi.getArtists AFTER api call")
    return res;
  }

  /** Get artists by genre (filtered by searchTerm and genre) */

  static async paginate(url) {
    console.log("inside SpotaflyApi.paginate BEFORE api call")
    let res = await this.request("discover/paginate", { url });
    console.log("inside SpotaflyApi.paginate AFTER api call")
    return res;
  }

  /** Get details on an artist by id. */

  static async getArtist(id) {
    let res = await this.request(`discover/artists/${id}`, { id });
    return res.artist;
  }

  /** Get artist's top tracks. */

  static async getArtistTopSongs(id) {
    console.log("inside getArtistAlbums BEFORE API call");
    let res = await this.request(`discover/artists/${id}/top-tracks`, { id });
    console.log("getArtistTopSongs res inside api.js", res);
    return res.topTracks;
  }

  /** Get artist's albums. */

  static async getArtistAlbums(id) {
    console.log("inside getArtistAlbums BEFORE API call");
    let res = await this.request(`discover/artists/${id}/albums`, { id });
    console.log("getArtistAlbums res inside api.js", res);
    return res.albums;
  }

  /** Get list of albums (filtered by searchTerm if not undefined) */

  static async getAlbums(searchTerm) {
    let res = await this.request("discover/albums", { searchTerm });
    console.log("AFTER backend call inside getAlbums in api.js");
    console.log("res in api.js getAlbums", res);
    return res;
  }

  /** Get list of songs (filtered by searchTerm if not undefined) */

  static async getSongs(searchTerm) {
    let res = await this.request("discover/songs", { searchTerm });
    console.log("AFTER backend call inside getAlbums in api.js");
    console.log("res in api.js getSongs", res.result);
    return res.result;
  }

  /** Get album by id */

  static async getAlbum(id) {
    console.log("inside SpotaflyApi.getAlbum() before API call")
    let res = await this.request(`discover/albums/${id}`, { id });
    console.log("album res inside Spotfaly.getAlbum()", res)
    return res.album;
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res;
  } 

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, 'post');
    return res;
  }

  /** Save user profile page. */

  static async updateProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Add song to currentUser's favorites. */

  static async addToFavorites(songId, username) {
    console.log("songId in api.js", songId)
    let res = await this.request(`users/${username}/favorites/add`, { songId, username }, "post");
    console.log("res in addToFavorites() in api.js", res);
    return res;
  }

  /** Removes song from currentUser's favorites. */

  static async removeFromFavorites(songId, username) {
    let res = await this.request(`users/${username}/favorites/remove`, { songId, username }, "delete");
    console.log("res in addToFavorites() in api.js", res);
    return res;
  }

  /** Create new playlist */

  static async createPlaylist(data) {
    let res = await this.request(`users/${data.username}/playlists/add-new`, data, "post");
    console.log("res in createPlaylist() api.js", res);
    return res.result;
  }

  /** Delete playlist */

  static async deletePlaylist(playlistId, username) {
    let res = await this.request(`users/${username}/playlists/${playlistId}/remove`, { playlistId }, "delete");
    console.log("res in deletePlaylist() api.js", res);
    return res.result;
  }

  /** Add song to playlist */

  static async addToPlaylist(songId, playlistId, username) {
    console.log("songId in api.js addToPlaylist", songId);
    let res = await this.request(`users/${username}/playlists/${playlistId}/add-song`, { songId, playlistId }, "post");
    console.log("res in createPlaylist() api.js", res);
    return res;
  }

  /** Remove song from playlist */

  static async removeFromPlaylist(songId, playlistId, username) {
    let res = await this.request(`users/${username}/playlists/${playlistId}/remove-song`, { songId, playlistId }, "delete");
    console.log("res in createPlaylist() api.js", res);
    return res;
  }

  /** Get playlist */

  static async getPlaylist(id, username) {
    console.log("inside getPlaylist in api.js BEFORE api call")
    console.log("id in getPlaylist api.js", id);
    let res = await this.request(`users/${username}/playlists/${id}`, { id, username });
    console.log("res in getPlaylist() api.js", res);
    return res;
  }

  /** Get several tracks with track ids */

  static async getTracks(ids) {
    let res = await this.request("discover/tracks", { ids });
    console.log("AFTER backend call inside getAlbums in api.js");
    console.log("res in api.js getTracks", res.result);
    return res.result;
  }

}


export default SpotaflyApi;
