/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
const asyncHandler = require('express-async-handler');
const { User, validateUser } = require('../models/user');

// @desc    Get a user by id
const getArtistById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -__v');
    if (!user) return res.status(404).send({
        message: 'User not found'
    });
    res.status(200).send({ user });
});


module.exports = { getArtistById };