const jwt = require("jsonwebtoken");
const axios = require('axios');
const { CLIENT_ID } = require("../config");
const { CLIENT_SECRET } = require("../config");
const SECRET_KEY = require("../config");
const Buffer = require("buffer");

/** return Spotify API access_token. */

async function createToken(user) {
    console.log("inside at top of createToken function backend")
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        },
        form: {
          grant_type: 'client_credentials'
        },
        json: true
      };
      console.log("authOptions inside createToken", authOptions)

    const token = await axios.post(authOptions);
    let payload = {
        username: user.username,
        access_token: token,
      };

    return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
