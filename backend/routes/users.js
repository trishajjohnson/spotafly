"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userUpdateSchema = require("../schemas/userUpdate.json");
const newPlaylistSchema = require("../schemas/newPlaylist.json");

const router = express.Router();


/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, favoriteSongs, followedArtists }
 *   where jobs is { id, title, companyHandle, companyName, state }
 *
 * Authorization required: same user-as-:username
 **/

router.get("/:username", ensureLoggedIn, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email, img_url }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.patch("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** POST /[username]/jobs/[id]  { state } => { application }
 *
 * Returns {"applied": jobId}
 *
 * Authorization required: same-user-as-:username
 * */

router.post("/:username/favorites/add", ensureCorrectUser, async function (req, res, next) {
  try {
    const { username, songId } = req.body;
    console.log("username, songId", username, songId);
    await User.addSongToFavorites(username, songId);
    return res.json({ added: songId });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:username/favorites/remove", ensureCorrectUser, async function (req, res, next) {
  try {
    const { username, songId } = req.body;
    console.log("username, songId", username, songId);
    await User.removeSongFromFavorites(username, songId);
    return res.json({ deleted: songId });
  } catch (err) {
    return next(err);
  }
});

// Add new playlist to DB

router.post("/:username/playlists/add-new", ensureCorrectUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, newPlaylistSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const { username, playlist_name, img_url } = req.body;
    console.log("req.body", req.body);
    const result = await User.createNewPlaylist(playlist_name, img_url, username);
    console.log("result in add playlist route", result);
    return res.json({ result });
  } catch (err) {
    return next(err);
  }
});

// Deletes playlist from DB

router.delete("/:username/playlists/:id/remove", ensureCorrectUser, async function (req, res, next) {
  try {
    const { playlistId } = req.body;
    console.log("req.body", req.body);
    const result = await User.removePlaylist(playlistId);
    console.log("result in remove playlist route", result);
    return res.json({ deleted: result });
  } catch (err) {
    return next(err);
  }
});

// Adds song to playlist

router.post("/:username/playlists/:id/add-song", ensureCorrectUser, async function (req, res, next) {
  try {
    const { songId, playlistId } = req.body;
    console.log("songId and playlistId in add song playlist route", songId, playlistId);
    await User.addSongToPlaylist(playlistId, songId);
    return res.json({ added: songId });
  } catch (err) {
    return next(err);
  }
});

// Removes song from playlist

router.delete("/:username/playlists/:id/remove-song", ensureCorrectUser, async function (req, res, next) {
  try {
    const { songId, playlistId } = req.body;
    const result = await User.removeSongFromPlaylist(songId, playlistId);
    console.log("result in remove song from playlist route", result);
    return res.json({ deleted: result });
  } catch (err) {
    return next(err);
  }
});

// Fetches playlist with id

router.get("/:username/playlists/:id", ensureCorrectUser, async function (req, res, next) {
  try {
    const { id, username } = req.params;
    const playlist = await User.getPlaylist(id, username);
    console.log("result in add playlist route", playlist);
    return res.json({ playlist });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
