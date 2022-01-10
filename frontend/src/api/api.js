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
    console.log("test");
    console.log("API Call in request function SpotaflyApi:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    let headers;
    if(!this.token){
      headers = {};
    } else {
      headers = { Authorization: `Bearer ${SpotaflyApi.token}` };
    }
    console.log("headers", headers)
    const params = (method === "get")
        ? data
        : {};

    try {
      const result = await axios({ url, data, method, params, headers }).data;
      console.log("url= ", url, method, data, params)
      console.log('result in request SpotaflyApi', result)
      return (result)
    } catch (err) {
      console.error("API Error inside SpotaflyApi:", err);
      // console.error("API Error:", err.response);
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

  /** Get artists (filtered by name if not undefined) */

  static async getArtists(name) {
    let res = await this.request("artists", { name });
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
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    console.log("data from signup api.js", data)
    console.log("inside signup function api.js frontend before calling backend route")
    let res = await this.request(`auth/register`, data, 'post');
    console.log("res inside signup of api.js", res)
    console.log("inside signup function api.js frontend after calling backend route")
    return res.token;
  }

  /** Save user profile page. */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}


export default SpotaflyApi;
