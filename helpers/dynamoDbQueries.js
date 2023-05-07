'use strict';

// Import Varables
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

// Import S3 Modules
const {
    S3Client, 
} = require('@aws-sdk/client-s3');

// Defining S3 Client
const client = new S3Client({ 
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
    region: 'us-east-1',
});

const listMusic = async (request, response) => {
    console.log(client, request, response);
};

const getMusic = async (request, response) => {
    console.log(client, request, response);
};

const postMusic = async (request, response) => {
    console.log(client, request, response);
};

const deleteMusic = async (request, response) => {
    console.log(client, request, response);
};

//Export Queries
module.exports = {
    listMusic,
    getMusic,
    postMusic,
    deleteMusic
};