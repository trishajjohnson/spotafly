import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 *
 */

class SpotaflyApi {

  /** the token for interacting with the API will be stored here. */

  static token;

  /** 
   * 
   * Base request function, called in the following API functions, used 
   * to call the backend routes. 
   * 
  */ 

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
      const result = await axios({ url, data, method, params, headers });
      return result.data;
    } catch (err) {
      console.error("API Error:", err);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Individual API routes */

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get New Releases. */

  static async getNewReleases() {
    let res = await this.request(`discover/new-releases`);
    return res.newReleases;
  }

  /** Get all genres. */ 

  static async getGenres() {
    let res = await this.request(`discover/genres`);
    return res;
  }

  /**  
   * Pagination route for displaying previous/next page results from 
   * Spotify API. 
   */

  static async paginate(url) {
    let res = await this.request("discover/paginate", { url });
    return res;
  }

  /** Get all artists (filtered by searchTerm and, optionally, genre) */

  static async getArtists(searchTerm, genre="") {
    let res = await this.request("discover/artists", { searchTerm, genre });
    return res;
  }

  /** Get details on an artist by id. */

  static async getArtist(id) {
    let res = await this.request(`discover/artists/${id}`, { id });
    return res.artist;
  }

  /** Get artist's top tracks. */

  static async getArtistTopSongs(id) {
    let res = await this.request(`discover/artists/${id}/top-tracks`, { id });
    return res.topTracks;
  }

  /** Get artist's albums. */

  static async getArtistAlbums(id) {
    let res = await this.request(`discover/artists/${id}/albums`, { id });
    return res.albums;
  }

  /** Get list of albums (filtered by searchTerm if not undefined) */

  static async getAlbums(searchTerm) {
    let res = await this.request("discover/albums", { searchTerm });
    return res;
  }

  /** Get list of songs (filtered by searchTerm if not undefined) */

  static async getSongs(searchTerm) {
    let res = await this.request("discover/songs", { searchTerm });
    return res.result;
  }

  /** Get album by id */

  static async getAlbum(id) {
    let res = await this.request(`discover/albums/${id}`, { id });
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

  /** Update user profile page. */

  static async updateProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Add song to currentUser's favorites. */

  static async addToFavorites(songId, username) {
    let res = await this.request(`users/${username}/favorites/add`, { songId, username }, "post");
    return res;
  }

  /** Removes song from currentUser's favorites. */

  static async removeFromFavorites(songId, username) {
    let res = await this.request(`users/${username}/favorites/remove`, { songId, username }, "delete");
    return res;
  }

  /** Create new playlist */

  static async createPlaylist(data) {
    let res = await this.request(`users/${data.username}/playlists/add-new`, data, "post");
    return res.result;
  }

  /** Delete playlist */

  static async deletePlaylist(playlistId, username) {
    let res = await this.request(`users/${username}/playlists/${playlistId}/remove`, { playlistId }, "delete");
    return res.result;
  }

  /** Add song to playlist */

  static async addToPlaylist(songId, playlistId, username) {
    let res = await this.request(`users/${username}/playlists/${playlistId}/add-song`, { songId, playlistId }, "post");
    return res;
  }

  /** Remove song from playlist */

  static async removeFromPlaylist(songId, playlistId, username) {
    let res = await this.request(`users/${username}/playlists/${playlistId}/remove-song`, { songId, playlistId }, "delete");
    return res;
  }

  /** Get playlist */

  static async getPlaylist(id, username) {
    let res = await this.request(`users/${username}/playlists/${id}`, { id, username });
    return res;
  }

  /** Get several tracks with track ids */

  static async getTracks(ids) {
    let res = await this.request("discover/tracks", { ids });
    return res.result;
  }

}


export default SpotaflyApi;
