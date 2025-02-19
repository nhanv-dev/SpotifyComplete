/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
const router = require('express').Router();


const songController = require('../controllers/songController');

const auth = require('../middlewares/authentication');
const validateObjectId = require('../middlewares/validateObjectId');

// create a new song
router.post("/", [auth], songController.createSong);
router.put("/:id", [auth, validateObjectId], songController.updateSongById);
router.delete("/:id", [auth, validateObjectId], songController.deleteSongById);
router.get("/artist/:id", [validateObjectId], songController.getSongsByArtistId);
router.get("/liked", [auth], songController.getLikedSongs);
router.put("/like/:id", [auth, validateObjectId], songController.likeSong);
router.get("/:id", [validateObjectId], songController.getSongById);
router.get("/", songController.getSongs);


module.exports = router;
