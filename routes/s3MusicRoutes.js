'use strict';

// Use Express
const express = require('express');
const s3MusicApi = express.Router();

// Import Queries
const {
	listS3Music,
	GetS3ObjectSignedUrl,
	postS3Music,
	deleteS3Music,
} = require('../helpers/s3MusicQueries.js');

// Photo API Routes
s3MusicApi.get('/', listS3Music);
s3MusicApi.get('/:name', GetS3ObjectSignedUrl);
s3MusicApi.post('/:name', postS3Music);
//s3MusicApi.delete('/:name', deleteS3Music);

// Export API
module.exports = s3MusicApi;