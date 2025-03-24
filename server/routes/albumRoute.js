/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
const router = require('express').Router();

const auth = require('../middlewares/authentication');
const validateObjectId = require('../middlewares/validateObjectId');
const albumController = require('../controllers/albumController');

router.post("/", [auth], albumController.createAlbum);
router.put("/:id", [auth], albumController.updateAlbum);
router.delete("/:id", [auth], albumController.deleteAlbum);
router.get("/:id", albumController.getAlbumById);
router.get("/artist/:id", albumController.getAlbumsByArtist);
router.get("/", albumController.getAllAlbums);

router.post("/:albumId/add-artist/:artistId", [auth], albumController.addArtistToAlbum);
router.post("/:albumId/remove-artist/:artistId", [auth], albumController.removeArtistFromAlbum);
router.post("/:albumId/add-song/:songId", [auth], albumController.addSongToAlbum);
router.post("/:albumId/remove-song/:songId", [auth], albumController.removeSongFromAlbum);


module.exports = router;
