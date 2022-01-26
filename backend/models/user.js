"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email }
   *
   * Throws UnauthorizedError if user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
          `SELECT username,
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
      { username, password, firstName, lastName, imgUrl, email }) {
    const duplicateCheck = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    let profileUrl;
    
    if(imgUrl === "") {
      profileUrl = "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg";
    } else {
      profileUrl = imgUrl;
    }

    const result = await db.query(
          `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            img_url,
            email)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", img_url as "imgUrl", email`,
        [
          username,
          hashedPassword,
          firstName,
          lastName,
          profileUrl,
          email
        ],
    );
    
    const favorites = await db.query(
      `INSERT INTO playlists (playlist_name, img_url, username)
       VALUES ($1, $2, $3)`,
    ["Favorite Songs", "https://ak.picdn.net/shutterstock/videos/3361085/thumb/1.jpg", username]);

    const user = result.rows[0];

    return user;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, favorite_songs, followed_artists }
   *   where favorite_songs is { id, song_title, album_title, artist_name, user_id }
   *   and followed_artists is { artist_id, user_id }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
          `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  img_url AS "imgUrl",
                  email
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    const favoritePlaylist = await db.query(
      `SELECT p.playlist_id
       FROM playlists AS p
       WHERE p.username = $1 AND p.playlist_name = $2`, 
      [username, "Favorite Songs"]);
    console.log("favoritePlaylist", favoritePlaylist);

    const favoriteSongs = await db.query(
      `SELECT s.song_id
       FROM songs_playlists AS s
       WHERE s.playlist_id = $1`, 
      [favoritePlaylist.rows[0].playlist_id]);

    console.log("favoriteSongs in get user model upon login", favoriteSongs);
    user.favoriteSongs = favoriteSongs.rows.map(s => s.song_id);
    console.log("user.favoriteSongs in backend user model", user.favoriteSongs);
    const userPlaylistsRes = await db.query(
          `SELECT p.playlist_id, p.playlist_name, p.img_url
           FROM playlists AS p
           WHERE p.username = $1`, [username]);

    user.playlists = userPlaylistsRes.rows.map(p => p);

    // const userFollowedArtistsRes = await db.query(
    //       `SELECT a.artist_id, a.artist_name
    //        FROM followed_artists AS a
    //        WHERE a.user_id = $1`, [username]);

    // user.followed_artists = userFollowedArtistsRes.rows.map(a => a.id);
    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email }
   *
   * Returns { username, firstName, lastName, email }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password.
   * Callers of this function must be certain they have validated inputs to this
   * or serious security risks are opened.
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          firstName: "first_name",
          lastName: "last_name"
        });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  /** Add song to favorites: update db, returns undefined.
   *
   * - username: username adding song to favorites
   * - artist_id: artist_id
   **/

  static async addSongToFavorites(username, songId) {
    const preCheck2 = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`, [username]);

    const user = preCheck2.rows[0];

    if (!user) throw new NotFoundError(`No username: ${username}`);

    const favoritesPlaylist = await db.query(
      `SELECT playlist_id
       FROM playlists
       WHERE playlist_name = $1 AND username = $2`, 
      ["Favorite Songs", username]);

    const preCheck = await db.query(
          `SELECT song_id
           FROM songs_playlists
           WHERE playlist_id = $1 AND song_id = $2`, 
          [favoritesPlaylist.rows[0].playlist_id, songId]);

    const song = preCheck.rows[0];

    if (song) throw new NotFoundError(`Song already in favorites: ${songId}`);

    await db.query(
          `INSERT INTO songs_playlists (song_id, playlist_id)
           VALUES ($1, $2)`,
        [songId, favoritesPlaylist.rows[0].playlist_id]);
  }

  static async removeSongFromFavorites(username, songId) {
    const preCheck2 = await db.query(
      `SELECT username
       FROM users
       WHERE username = $1`, [username]);

    const user = preCheck2.rows[0];

    if (!user) throw new NotFoundError(`No username: ${username}`);

    const favoritesPlaylist = await db.query(
      `SELECT playlist_id
       FROM playlists
       WHERE playlist_name = $1 AND username = $2`, 
      ["Favorite Songs", username]);

    let result = await db.query(
        `DELETE
        FROM songs_playlists
        WHERE playlist_id = $1 AND song_id = $2
        RETURNING song_id`,
      [favoritesPlaylist.rows[0].playlist_id, songId],
    );

    const song = result.rows[0];

    if (!song) throw new NotFoundError(`No song: ${songId}`);
  }

  static async createNewPlaylist(playlist_name, img_url, username) {
    let result;
    if(img_url !== "") {
      result = await db.query(
            `INSERT INTO playlists (playlist_name, img_url, username)
             VALUES ($1, $2, $3)
             RETURNING playlist_id, playlist_name, img_url`,
          [playlist_name, img_url, username]);
    } else {
      const default_img = "https://us.123rf.com/450wm/soloviivka/soloviivka1606/soloviivka160600001/59688426-music-note-vector-icon-white-on-black-background.jpg?ver=6";
      result = await db.query(
        `INSERT INTO playlists (playlist_name, img_url, username)
         VALUES ($1, $2, $3)
         RETURNING playlist_id, playlist_name, img_url`,
      [playlist_name, default_img, username]);
    }

    const playlist = result.rows[0];
    console.log("playlist in user model", playlist);
    if (!playlist) throw new BadRequestError(`Playlist not added`);

    return playlist;
  }

  static async removePlaylist(playlistId) {
    const result = await db.query(
      `DELETE 
       FROM playlists
       WHERE playlist_id = $1
       RETURNING playlist_id`, 
      [playlistId]);

    const playlist = result.rows[0];

    if (!playlist) throw new NotFoundError(`No playlist: ${playlistId}`);

    return playlist;
  }

  static async addSongToPlaylist(playlistId, songId) {
    const result = await db.query(
      `SELECT playlist_id
       FROM playlists
       WHERE playlist_id = $1`, 
      [playlistId]);
    
    const playlist = result.rows[0];

    if(!playlist) throw new NotFoundError(`No playlist found: ${playlistId}`);
      console.log("songId in addSongToPlaylist user model", songId);
    const preCheck = await db.query(
          `SELECT song_id
           FROM songs_playlists
           WHERE playlist_id = $1 AND song_id = $2`, 
          [playlistId, songId]);

    const song = preCheck.rows[0];

    if (song) throw new NotFoundError(`Song already in playlist: ${songId}`);

    await db.query(
          `INSERT INTO songs_playlists (song_id, playlist_id)
           VALUES ($1, $2)`,
        [songId, playlistId]);
  }

  static async removeSongFromPlaylist(songId, playlistId) {
    let result = await db.query(
      `DELETE
      FROM songs_playlists
      WHERE playlist_id = $1 AND song_id = $2
      RETURNING song_id`,
    [playlistId, songId],
  );

  const song = result.rows[0];

  if (!song) throw new NotFoundError(`No song: ${songId}`);

  return song;
}


  static async getPlaylist(id, username) {
    const playlistRes = await db.query(
          `SELECT playlist_id,
                  playlist_name,
                  img_url,
                  username
            FROM playlists
            WHERE playlist_id = $1`,
        [id],
    );

    const playlist = playlistRes.rows[0];

    if (!playlist) throw new NotFoundError(`No playlist: ${id}`);
    
    const playlistSongsRes = await db.query(
          `SELECT p.song_id
            FROM songs_playlists AS p
            WHERE p.playlist_id = $1`, [id]
    );
            
    playlist.tracks = playlistSongsRes.rows.map(t => t.song_id);

    console.log("playlist in getPlaylist user model", playlist);
    return playlist;
  }


  /** Add artist to followed_artists: update db, returns undefined.
   *
   * - username: username adding song to favorites
   * - artist_id: artist_id
   **/
}


module.exports = User;
 