/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
const asyncHandler = require('express-async-handler');
const {User, validateUser} = require('../models/user');

// @desc    Get all users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password -__v');
    res.status(200).send({users});
});

// @desc    Get a user by id
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -__v');
    if (!user) return res.status(404).send({
        message: 'User not found'
    });
    res.status(200).send({user});
});

// @desc    Update a user by id
const updateUserById = asyncHandler(async (req, res) => {
    console.log(req.body)
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new: true}
    ).select('-password -__v');
    console.log(user)
    if (!user) return res.status(404).send('User not found');
    return res.status(200).send({user});
});

// @desc    Delete a user by id
const deleteUserById = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({message: 'User deleted successfully'});

});


module.exports = {getUsers, getUserById, updateUserById, deleteUserById};