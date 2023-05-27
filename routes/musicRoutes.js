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
musicApi.get('/', listMusic);
musicApi.get('/artist', getMusic);
musicApi.get('/url', getMusicUrl);
musicApi.post('/', postMusic);
musicApi.delete('/', deleteMusic);


// ------------
// Export API's
// ------------

// Export API
module.exports = musicApi;