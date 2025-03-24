/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
const asyncHandler = require('express-async-handler');
const Song = require('../models/song');
const {User} = require("../models/user");


// @desc    create a new song
const createSong = asyncHandler(async (req, res) => {
    const {error} = Song.validateSong(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const song = await new Song(req.body).save();
    res.status(200).send({song, message: 'Song created successfully'});
});

// @desc    Update a song by id
const updateSongById = asyncHandler(async (req, res) => {
    const song = await Song.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
    if (!song) return res.status(404).send({message: 'Song not found'});
    return res.status(200).send({song});
});

// @desc    Delete a song by id
const deleteSongById = asyncHandler(async (req, res) => {
    const isDelete = await Song.findByIdAndDelete(req.params.id);
    res.status(200).send({
        message: 'Song deleted successfully',
        isDeleteSong: isDelete

    });
});

// @desc    Get a song by id
const getSongById = asyncHandler(async (req, res) => {
    const song = await Song.getSongById(req.params.id);
    if (!song) return res.status(404).send({message: 'Song not found'});
    res.status(200).send({song});
});

// @desc    Get all songs
const getSongs = asyncHandler(async (req, res) => {
    const {page, limit} = req.query;
    const songs = await Song.getSongs(page, limit);
    return res.status(200).send({songs});
});

// @desc    Get a song by artist id
const getSongsByArtistId = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const songs = await Song.getSongsByArtistId(id);
    if (!songs) return res.status(404).send({message: 'Artist not found'});
    return res.status(200).send({songs});
});

// @desc   like a song
const likeSong = asyncHandler(async (req, res) => {
    let responseMessage = '';
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).send({
        message: 'Song not found'
    });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send({
        message: 'User not found'
    });
    const match = user.likedSongs.find((songLike) => songLike._id.toString() === song._id.toString());
    // console.log(match, 'match');
    const index = user.likedSongs.indexOf(match);
    // console.log(song._id, 'song._id');
    // console.log(index, 'index');
    if (index === -1) {
        // console.log('liked');
        user.likedSongs.push(song)
        await user.save();
        responseMessage = 'Song liked successfully';
    } else {
        // console.log('unliked');
        user.likedSongs.splice(index, 1);
        await user.save();
        responseMessage = 'Song unliked successfully';
    }
    res.status(200).send({
        message: responseMessage,


    });
});

const getLikedSongs = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).send({
        message: 'User not found'
    });
    const songs = await Song.getSongsByAllId(user.likedSongs);
    res.status(200).send({
        songs,
        message: 'Liked songs fetched successfully'
    });
});


module.exports = {
    createSong,
    getSongs,
    getSongById,
    getSongsByArtistId,
    updateSongById,
    deleteSongById,
    likeSong,
    getLikedSongs
}
