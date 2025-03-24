/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
const asyncHandler = require('express-async-handler');
const Song = require('../models/song');
const {Album, validateAlbum} = require('../models/album');
const {User} = require("../models/user");

const createAlbum = asyncHandler(async (req, res) => {
    const {error} = validateAlbum(req.body);
    if (error) return res.status(400).send({message: error.details[0].message});

    const {artists} = req.body;
    if (!Array.isArray(artists)) {
        return res.status(400).send({message: 'Artists must be provided as an array'});
    }
    try {
        const users = await User.find({_id: {$in: artists}, isArtist: true});
        const validArtistIds = users.map(user => user._id);

        if (users.length !== artists.length) {
            const invalidArtistIds = artists.filter(artistId => !validArtistIds.includes(artistId));
            return res.status(400).send({message: `One or more artists are not valid: ${invalidArtistIds.join(', ')}`});
        }
        const album = new Album({...req.body, artists: validArtistIds});
        await album.save();
        return res.status(200).send({album, message: 'Album created successfully'});
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});

const updateAlbum = asyncHandler(async (req, res) => {
    const {error} = validateAlbum(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).send({message: 'Album not found'});
    const user = await User.findById(req.user._id);
    const havePermission = album.artists?.includes(user._id);
    if (!havePermission) return res.status(403).send({message: 'User do not have permission to edit this playlist'});
    album.title = req.body.title;
    album.imageUrl = req.body.imageUrl;
    album.artists = req.body.artists;
    album.totalTracks = req.body.totalTracks;
    album.duration = req.body.duration;
    await album.save();
    album.songs = await Song.find({'_id': {$in: album.songs}}).exec();
    return res.status(200).send({album, message: 'Album updated successfully'});
});

const deleteAlbum = asyncHandler(async (req, res) => {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).send({message: 'Album not found'});
    const user = await User.findById(req.user._id);
    const havePermission = album.artists?.includes(user._id);
    if (!havePermission) return res.status(403).send({message: 'User do not have permission to edit this playlist'});
    await album.deleteOne();
    return res.status(200).send({message: 'Album deleted successfully'});
});

const addSongToAlbum = asyncHandler(async (req, res) => {
    const {albumId, songId} = req.params;
    const album = await Album.findById(albumId);
    if (!album) {
        res.status(404).send({message: 'Album not found'});
        return;
    }
    const song = await Song.findById(songId);
    if (!song) {
        res.status(404).send({message: 'Song not found'});
        return;
    }
    if (album.songs.includes(songId)) {
        res.status(400).send({message: 'Song already exists in album'});
        return;
    }
    album.songs.push(songId);
    album.totalTracks += 1;
    album.duration += song.duration;
    await album.save();
    res.status(200).send({album, message: 'Song added to album successfully'});
});

const removeSongFromAlbum = asyncHandler(async (req, res) => {
    const {albumId, songId} = req.params;
    const album = await Album.findById(albumId);
    if (!album) {
        res.status(404).send({message: 'Album not found'});
        return;
    }
    const song = await Song.findById(songId);
    if (!song) {
        res.status(404).send({message: 'Song not found'});
        return;
    }
    if (!album.songs.includes(songId)) {
        res.status(400).send({message: 'Song does not exist in album'});
        return;
    }
    album.songs = album.songs.filter(song => song.toString() !== songId);
    album.totalTracks -= 1;
    album.duration -= song.duration;
    await album.save();

    return res.status(200).send({album, message: 'Song removed from album successfully'});
});

const addArtistToAlbum = asyncHandler(async (req, res) => {
    const albumId = req.params.albumId;
    const artistId = req.params.artistId;
    const album = await Album.findById(albumId).select('-__v');
    if (!album) {
        res.status(404).send({message: 'Album not found'});
        return;
    }
    const artist = await User.findById(artistId).select('-password -__v');
    if (!artist) {
        res.status(404).send({message: 'Artist not found'});
        return;
    }
    if (album.artists.includes(artistId)) {
        res.status(400).send({message: 'Artist already exists in album'});
        return;
    }
    album.artists.push(artistId);
    await album.save();
    res.status(200).send({album, message: 'Artist added to album successfully'});
});

const removeArtistFromAlbum = asyncHandler(async (req, res) => {
    const {albumId, artistId} = req.params;
    const album = await Album.findById(albumId).select('-__v');
    if (!album) {
        res.status(404).send({message: 'Album not found'});
        return;
    }
    const artist = await User.findById(artistId).select('-password -__v');
    if (!artist) {
        res.status(404).send({message: 'Artist not found'});
        return;
    }
    if (!album.artists.includes(artistId)) {
        res.status(400).send({message: 'Artist does not exist in album'});
        return;
    }
    album.artists = album.artists.filter(artist => artist.toString() !== artistId.toString());
    await album.save();
    res.status(200).send({album, message: 'Artist removed from album successfully'});
});

const getAlbumById = asyncHandler(async (req, res) => {
    const album = await Album.getAlbumById(req.params.id);
    res.status(200).send({album});
});

// get albums by artist id (paginated)
const getAlbumsByArtist = asyncHandler(async (req, res) => {
    const {page, limit} = req.query;
    const albums = await Album.getAlbumsByArtistId(req.params.id, page, limit);
    res.status(200).send({albums});
});

// get all albums (paginated)
const getAllAlbums = asyncHandler(async (req, res) => {
    const {page, limit} = req.query;
    const albums = await Album.getAllAlbums(page, limit);
    res.status(200).send({albums});
});


module.exports = {
    createAlbum, updateAlbum, deleteAlbum,
    getAlbumById, getAlbumsByArtist,
    addSongToAlbum, removeSongFromAlbum,
    addArtistToAlbum, removeArtistFromAlbum,
    getAllAlbums
}
