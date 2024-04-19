'use strict';

// --------------
// Module Imports
// --------------

// Use Express
const express = require('express');
const musicApi = express.Router();

// Import Queries
const {
    listMusic,
    getMusic,
    getMusicUrl,
    postMusic,
    deleteMusic,
} = require('../api/musicAPIs.js');


// ----------
// API Routes
// ----------

// Music API Routes
musicApi.get('/list', listMusic);
musicApi.get('/artist', getMusic);
musicApi.get('/url', getMusicUrl);
musicApi.post('/upload', postMusic);
musicApi.delete('/delete', deleteMusic);


// ------------
// Export API's
// ------------

// Export API
module.exports = musicApi;