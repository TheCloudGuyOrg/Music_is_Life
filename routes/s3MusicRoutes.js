'use strict';

//Use Express
const express = require('express');
const s3MusicApi = express.Router();

//Import Queries
const {
	listS3Music,
	getS3Music,
	putS3Music,
	deleteS3Music,
} = require('../helpers/s3MusicQueries.js');

//Photo API Routes
s3MusicApi.get('/', listS3Music);
s3MusicApi.get('/:name', getS3Music);
s3MusicApi.post('/', putS3Music);
s3MusicApi.delete('/:name', deleteS3Music);

//Export API
module.exports = s3MusicApi;