/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
const { User, validateUser } = require('../models/user');
const asyncHandler = require('express-async-handler');

const bcrypt = require('bcrypt');

// @desc    Login a user
const login = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ message: 'Invalid email' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ message: 'Invalid password' });

    const token = user.generateAuthToken();
    user.password = undefined;
    res.status(200).send({ token, user, message: 'User login successfully' });
});

// @desc    Register a new user
const register = asyncHandler(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ message: 'User already registered.' });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await new User({ ...req?.body, password: hashedPassword }).save();
    res.status(200).send({ message: 'Account created successfully' });
});

module.exports = { login, register };