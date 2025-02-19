/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
const mongoose = require('mongoose');

const Joi = require("joi");

const albumSchema = new mongoose.Schema({
    title: {type: String, required: true},
    imageUrl: {type: String, required: true},
    totalTracks: {type: Number, required: false, default: 0},
    duration: {type: Number, required: false, default: 0},
    artists: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', default: []}],
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song', default: []}],
}, {timestamps: true});


const validateAlbum = (album) => {
    return Joi.object({
        title: Joi.string().required(),
        imageUrl: Joi.string().required(),
        duration: Joi.number().required(),
        totalTracks: Joi.number().required(),
        songs: Joi.array().items(Joi.string().required()).required(),
        artists: Joi.array().items(Joi.string().required()).required(),
    }).validate(album);
};

albumSchema.statics.getAlbumById = async function (id) {
    return await this.findOne({_id: id}).populate('songs').populate('artists');
}

albumSchema.statics.getAlbumsByArtistId = async function (id, page, limit) {
    return await this.find({artists: {$in: [id]}}).limit(limit).skip(limit * page).populate('songs').populate('artists');
}

albumSchema.statics.getAllAlbums = async function (page, limit) {
    return await this.find({}).limit(limit).skip(limit * page).populate('artists');
}

const Album = mongoose.model('Album', albumSchema);

module.exports = {Album, validateAlbum}
