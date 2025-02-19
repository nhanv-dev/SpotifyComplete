/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'], required: true, default: 'OTHER' },
    birthday: { type: Date, required: true },
    isArtist: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    likedSongs: { type: [], default: [] },
    playLists: { type: [String], default: [] },
}, { timestamps: true })

userSchema.methods.generateAuthToken = function () {
    const payload = { _id: this._id, name: this.name, isAdmin: this.isAdmin };
    return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: '7d' });
}

const validateUser = (user) => {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: passwordComplexity().required(),
        birthday: joi.date().required(),
        gender: joi.string().valid("MALE", "FEMALE", "OTHER")
    });
    return schema.validate(user);
}

// get user by id
userSchema.statics.getUserById = async function (id) {
    return await this.findOne({ _id: id });
}

const User = mongoose.model('User', userSchema);

module.exports = { User, validateUser, userSchema };