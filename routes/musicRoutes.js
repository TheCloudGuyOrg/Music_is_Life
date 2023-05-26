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
musicApi.get('/:name', getMusic);
musicApi.get('/url/:name', getMusicUrl);
musicApi.post('/', postMusic);
//musicApi.delete('/:name', deleteMusic);


// ------------
// Export API's
// ------------

// Export API
module.exports = musicApi;