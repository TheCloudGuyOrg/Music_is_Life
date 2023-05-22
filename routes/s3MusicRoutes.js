'use strict';

// Use Express
const express = require('express');
const s3MusicApi = express.Router();

// Import Queries
const {
    GetS3ObjectSignedUrl,
    deleteS3Music,
} = require('../helpers/s3MusicQueries.js');

const { multiPartUpload } = require('../helpers/s3MultiPartUpload.js');

// Photo API Routes
//s3MusicApi.get('/:name', GetS3ObjectSignedUrl);
s3MusicApi.post('/upload', multiPartUpload);
s3MusicApi.delete('/:name', deleteS3Music);

// Export API
module.exports = s3MusicApi;