const jwt = require("jsonwebtoken");
const axios = require('axios');
const { CLIENT_ID } = require("../config");
const { CLIENT_SECRET } = require("../config");
const { SECRET_KEY } = require("../config");
const { API_ACCESS_TOKEN } = require("../config");
const Buffer = require("buffer").Buffer;
const { URLSearchParams } = require("url");

/** return Spotify API access_token. */

async function createToken(user) {
  const url = 'https://accounts.spotify.com/api/token';
  const authOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
    },  
    data: new URLSearchParams({grant_type: 'client_credentials'})
  };
  console.log("authOptions", authOptions)

  const token = await axios(url, authOptions);
  process.env.API_ACCESS_TOKEN = token.data.access_token;
  console.log("access token", token.data.access_token)
  // process.env.REFRESH_ACCESS_TOKEN = token.data.refresh_token;
  let payload = {
    username: user.username,
    // access_token: token.data.access_token,
  };
  
  return jwt.sign(payload, SECRET_KEY);
}


module.exports = { createToken, API_ACCESS_TOKEN };
