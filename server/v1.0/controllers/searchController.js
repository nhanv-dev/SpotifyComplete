
const asyncHandler = require('express-async-handler');

const Song = require('../models/song');
const { Album } = require('../models/album');
const { User } = require('../models/user');
const { PlayList } = require('../models/playlist');

// @desc    Search for a song 

const search = asyncHandler(async (req, res) => {
    const searchQuery = req.query.q;
    if (searchQuery !== "") {
        const songs = await Song.find({
            title: { $regex: searchQuery, $options: 'i' }
        }).limit(10).populate('artists');
        const playlists = await PlayList.find({
            name: { $regex: searchQuery, $options: 'i' }
        }).limit(10).populate('songs').populate('user');
        const albums = await Album.find({
            title: { $regex: searchQuery, $options: 'i' }
        }).limit(10).populate('songs').populate('artists');
        const artists = await User.find({
            name: { $regex: searchQuery, $options: 'i' }
        }).limit(10);
        const result = { songs, albums, playlists, artists };
        res.status(200).send({ result });

    } else {
        res.status(200).send({ message: "No search query" });
    }


});

const searchArtistByFullText = asyncHandler(async (req, res) => {
    const searchQuery = req.query.q;
    if (searchQuery !== "") {
        const artists = await User.find({
            name: { $regex: searchQuery, $options: 'i' }
        }).limit(10);
        res.status(200).send({ artists });
    } else {
        res.status(200).send({ message: "No search query" });
    }
});


module.exports = { search };

