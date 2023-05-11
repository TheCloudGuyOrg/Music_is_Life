'use strict';

// Use Express
const express = require('express');
const musicApi = express.Router();

// Import Queries
const {
    listMusic,
    getMusic,
    postMusic,
    deleteMusic,
} = require('../helpers/musicQueries.js');


// Music API Routes
musicApi.get('/', listMusic);
musicApi.get('/:name', getMusic);
musicApi.post('/', postMusic);
musicApi.delete('/:name', deleteMusic);

// Export API
module.exports = musicApi;