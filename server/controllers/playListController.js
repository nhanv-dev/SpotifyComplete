const {PlayList, validatePlayList} = require('../models/playlist');
const {User} = require('../models/user');
const Song = require('../models/song');
const asyncHandler = require('express-async-handler');
const joi = require('joi');

// @desc    create a new playlist
const createPlayList = asyncHandler(async (req, res) => {
    const {error} = validatePlayList(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send({
        message: 'User not found'
    });
    const playList = await new PlayList({...req.body, user: user._id}).save();
    user.playLists.push(playList._id);
    await user.save();
    res.status(200).send({playList, message: 'Playlist created successfully'});
});

// @desc    edit a playlist
const editPlayList = asyncHandler(async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        description: joi.string().allow(''),
        imageUrl: joi.string().allow(''),
    });
    const {error} = validatePlayList(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const playList = await PlayList.findById(req.params.id);
    if (!playList) return res.status(404).send({
        message: 'Playlist not found'
    });

    const user = await User.findById(req.user._id);
    if (!user._id.equals(playList.user)) return res.status(403).send({
        message: 'User do not have permission to edit this playlist'
    });
    playList.name = req.body.name;
    playList.description = req.body.description;
    playList.imageUrl = req.body.imageUrl;
    await playList.save();
    playList.songs = await Song.find({'_id': {$in: playList.songs}}).exec();
    res.status(200).send({playList, message: 'Playlist edited successfully'});
});

// @desc    Get add song to playlist
const addSongToPlayList = asyncHandler(async (req, res) => {
    const schema = joi.object({
        playListId: joi.string().required(),
        songId: joi.string().required(),
    });
    const {error} = schema.validate(req.body);

    if (error) return res.status(400).send({
        errorMessage: error.details[0].message,
        message: "Invalid request body"
    });

    const user = await User.findById(req.user._id);
    const playList = await PlayList.findById(req.body.playListId);

    if (!user) return res.status(404).send({
        message: 'User not found'
    });

    if (!playList) return res.status(404).send({
        message: 'Playlist not found'
    });

    if (!user._id.equals(playList.user)) return res.status(403).send({
        message: 'User do not have permission to add song to this playlist'
    });

    if (playList.songs.indexOf(req.body.songId) !== -1) return res.status(400).send({
        message: 'Song already added to playlist'
    });

    playList.songs.push(req.body.songId);
    await playList.save();
    res.status(200).send({data: playList, message: 'Song added to playlist successfully'});

})

// @desc    Remove song from playlist
const removeSongFromPlayList = asyncHandler(async (req, res) => {
    const schema = joi.object({
        playListId: joi.string().required(),
        songId: joi.string().required(),
    });
    const {error} = schema.validate(req.body);  // validate the request body first
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findById(req.user._id);
    const playList = await PlayList.findById(req.body.playListId);

    if (!user._id.equals(playList.user)) return res.status(403).send({
        message: 'User do not have permission to remove song to this playlist'
    });

    const index = playList.songs.indexOf(req.body.songId);
    if (index === -1) return res.status(400).send({
        message: 'Song not found in playlist'
    });
    playList.songs.splice(index, 1);
    await playList.save();
    res.status(200).send({data: playList, message: 'Song removed from playlist successfully'});
});

// @desc    Get user favorite playlist
const getUserFavoritePlayList = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const playLists = await PlayList.find({_id: {$in: user.playLists}});
    res.status(200).send({data: playLists, message: 'Playlists fetched successfully'});
});

// @desc    Get random playlist
const getRandomPlayList = asyncHandler(async (req, res) => {
    const playLists = await PlayList.aggregate([{$sample: {size: 10}}]);
    res.status(200).send({data: playLists, message: 'Playlists fetched successfully'});
});

// @desc    Get playlist by id and songs
const getPlayListById = asyncHandler(async (req, res) => {
    const playList = await PlayList.getPlaylistById(req.params.id);
    if (!playList) return res.status(404).send({message: 'Playlist not found'});
    return res.status(200).send({playList, message: 'Playlist fetched successfully'});
});

// @desc    Get playlist by id and songs
const getPlayListByUserId = asyncHandler(async (req, res) => {
    const playLists = await PlayList.find({user: req.params.id});
    if (!playLists) return res.status(404).send({message: 'Playlist not found'});
    res.status(200).send({playLists, message: 'Playlist fetched successfully'});
});

// @desc    Get all playlists
const getAllPlayLists = asyncHandler(async (req, res) => {
    const playLists = await PlayList.find();
    res.status(200).send({playLists, message: 'Playlists fetched successfully'});
});

// @desc    delete a playlist by id
const deletePlayList = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const playList = await PlayList.findById(req.params.id);
    if (!user._id.equals(playList.user)) return res.status(403).send({
        message: 'User do not have permission to delete this playlist'
    });
    const index = user.playLists.indexOf(req.params.id);

    if (index === -1) return res.status(400).send({
        message: 'Playlist not found'
    });
    user.playLists.splice(index, 1);
    await user.save();
    await playList.deleteOne();
    res.status(200).send({message: 'Playlist deleted successfully'});
});

module.exports = {
    createPlayList,
    editPlayList,
    addSongToPlayList,
    removeSongFromPlayList,
    getPlayListByUserId,
    getUserFavoritePlayList,
    getRandomPlayList,
    getPlayListById,
    getAllPlayLists,
    deletePlayList
};
