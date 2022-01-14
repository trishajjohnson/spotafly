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

  /** Get artists (filtered by name if not undefined) */

  static async getArtists(searchTerm) {
    console.log("inside SpotaflyApi.getArtists BEFORE api call")
    let res = await this.request("discover/artists", { searchTerm });
    console.log("inside SpotaflyApi.getArtists AFTER api call")
    return res.artists;
  }

  /** Get details on an artist by id. */

  static async getArtist(id) {
    let res = await this.request(`artists/${id}`);
    return res.artist;
  }

  /** Get list of albums (filtered by title if not undefined) */

  static async getAlbums(title) {
    let res = await this.request("albums", { title });
    return res.albums;
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

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}


export default SpotaflyApi;
