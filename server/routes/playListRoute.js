/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
const router = require('express').Router();

const auth = require('../middlewares/authentication');
const admin = require('../middlewares/administrator');
const validateObjectId = require('../middlewares/validateObjectId');

const { createPlayList,
    editPlayList,
    addSongToPlayList,
    removeSongFromPlayList,
    getUserFavoritePlayList,
    getRandomPlayList,
    getPlayListById,
    getAllPlayLists,
    deletePlayList,
    getPlayListByUserId } = require('../controllers/playListController');

router.post("/create", [auth], createPlayList);
router.put("/edit/:id", [auth], editPlayList);
router.put("/addSong", [auth], addSongToPlayList);
router.put("/removeSong", [auth], removeSongFromPlayList);
router.get("/favorite", [auth], getUserFavoritePlayList);
router.get("/random", [auth], getRandomPlayList);
router.get("/user/:id", [auth], getPlayListByUserId);
router.get("/:id", [auth, validateObjectId], getPlayListById);
router.get("/playlists", [auth], getAllPlayLists);
router.delete("/:id", [auth, validateObjectId], deletePlayList);

module.exports = router;