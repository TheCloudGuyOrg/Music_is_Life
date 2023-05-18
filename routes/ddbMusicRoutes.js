'use strict';

// Use Express
const express = require('express');
const ddbMusicApi = express.Router();

// Import Queries
const {
    getMusic,
    postMusic,
    deleteMusic,
} = require('../helpers/dynamoDbQueries.js');


// Photo API Routes
ddbMusicApi.get('/:name', getMusic);
ddbMusicApi.post('/', postMusic);
ddbMusicApi.delete('/:name', deleteMusic);

// Export API
module.exports = ddbMusicApi;