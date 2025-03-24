/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
const router = require('express').Router();

const { getArtistById } = require('../controllers/artistController');

router.get("/:id", getArtistById);

module.exports = router;
