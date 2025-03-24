/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
require('dotenv').config();
require("express-async-errors");
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const songRoute = require('./routes/songRoute');
const albumRoute = require('./routes/albumRoute');
const playListRoute = require('./routes/playListRoute');
const searchRoute = require('./routes/searchRoute');
const artistRoute = require('./routes/artistRoute');

// db connection
const dbConnect = require('./config/dbConnect');
dbConnect();
// db connection

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// middleware

// routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/artists', artistRoute);
app.use('/api/songs', songRoute);
app.use('/api/albums', albumRoute);
app.use('/api/playlists', playListRoute);
app.use('/api/search', searchRoute);
// routes


// Error handler
app.use(notFound);
app.use(errorHandler);
// Error handler


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


