/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
const mongoose = require('mongoose');

const joi = require('joi');

const songSchema = new mongoose.Schema({
    title: {type: String, required: true,},
    songSrc: {type: String, required: true,},
    imageUrl: {type: String, required: true,},
    duration: {type: Number, required: true,},
    artists: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', default: []}],
    album: {type: mongoose.Schema.Types.ObjectId, ref: 'Album'},
}, {timestamps: true});

songSchema.statics.validateSong = function (song) {
    const schema = joi.object({
        title: joi.string().required(),
        artists: joi.array().required(),
        songSrc: joi.string().required(),
        imageUrl: joi.string().required(),
        duration: joi.number().required(),
    });
    return schema.validate(song);
}
songSchema.statics.getSongs = async function (page, limit) {
    return await this.find().limit(limit).skip(limit * page).populate('artists');
}

songSchema.statics.getSongById = async function (id) {
    return await this.findById(id).populate('artists');
}

songSchema.statics.getSongsByAllId = async function (ids) {
    return await this.find({'_id': {$in: ids}}).populate('artists');
}

songSchema.statics.getSongsByArtistId = async function (id) {
    return await this.find({artists: {$in: [id]}}).populate('artists');
}

// get Artist by Id
songSchema.statics.getArtistById = async function (id) {
    return await this.findById(id).populate('artists');
}


module.exports = mongoose.model('Song', songSchema);
