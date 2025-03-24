/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
const mongoose = require('mongoose');
const joi = require('joi');

const playListSchema = new mongoose.Schema({
    name: {type: String, required: true,},
    description: {type: String},
    imageUrl: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,},
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song', default: []}],
}, {timestamps: true});

const validatePlayList = (playList) => {
    const schema = joi.object({
        name: joi.string().required(),
        description: joi.allow(''),
        imageUrl: joi.allow(''),
        user: joi.string().required(),
        songs: joi.allow(''),
    });
    return schema.validate(playList);
}

playListSchema.statics.getPlaylistById = async function (id) {
    const options = {path: 'songs.artists', model: 'User'};
    return await PlayList.findById(id).populate('user').populate('songs')
        .then(async (data) => {
            const options = {path: 'songs.artists', model: 'User'};
            return await PlayList.populate(data, options);
        })
}
const PlayList = mongoose.model('PlayList', playListSchema);

module.exports = {PlayList, validatePlayList};