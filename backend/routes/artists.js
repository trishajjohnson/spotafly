"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const { createToken } = require("../helpers/tokens");

const router = express.Router();


/** GET / => { artists }
 *
 * Returns list of all artists.
 *
 * Authorization required: none
 **/

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const artists = await axios.get(User.findAll());
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});


/** GET /[id] => { artist }
 *
 * Returns { artist json obj w/ artist information -- fill in exact pieces of info later (ie: { id, artist_name, songs, albums ) }
 *   where jobs is { id, title, companyHandle, companyName, state }
 *
 * Authorization required: user must be logged in
 **/

router.get("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});
module.exports = router;