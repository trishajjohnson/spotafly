"use strict";

/** Routes for discover. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Discover = require("../models/discover");
const musicSearchAuthSchema = require("../schemas/musicSearch.json")
const router = express.Router();


router.get("/genres", ensureLoggedIn, async function (req, res, next) {
    try {
      console.log("inside discover/genres route BEFORE calling Discover.getGenres()")
      const genres = await Discover.getGenres();
      console.log("inside discover/genres route AFTER calling Discover.getGenres()")
      return res.json({ genres });
    } catch (err) {
      return next(err);
    }
});

router.get("/new-releases", ensureLoggedIn, async function (req, res, next) {
    try {
      console.log("inside discover/genres route BEFORE calling Discover.getGenres()")
      const newReleases = await Discover.getNewReleases();
      console.log("inside discover/genres route AFTER calling Discover.getGenres()")
      return res.json({ newReleases });
    } catch (err) {
      return next(err);
    }
});

router.get("/artists", ensureLoggedIn, async function (req, res, next) {
    console.log("inside discover/artists route on backend BEFORE try validators")
    console.log("req.query", req.query)
    console.log("req.body", req.body)
    try {
        const validator = jsonschema.validate(req.body, musicSearchAuthSchema);
        if (!validator.valid) {
          const errs = validator.errors.map(e => e.stack);
          throw new BadRequestError(errs); 
        }
    
        const { searchTerm } = req.body;
        console.log("searchTerm inside discover/artists route", searchTerm);
        console.log("inside discover/artists route BEFORE calling Discover.getArtists()")
        const artistsByGenre = await Discover.getArtists(searchTerm);
        console.log("inside discover/artists route AFTER calling Discover.getArtists()")
        return res.json({ artistsByGenre });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
