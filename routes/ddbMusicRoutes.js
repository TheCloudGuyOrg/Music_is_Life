'use strict';

// Use Express
const express = require('express');
const ddbMusicApi = express.Router();

// Import Queries
const {
    getMusic,
    deleteMusic,
} = require('../helpers/dynamoDbQueries.js');


// Photo API Routes
ddbMusicApi.delete('/:name', deleteMusic);

// Export API
module.exports = ddbMusicApi;