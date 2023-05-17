'use strict';

// --------------
// Module Imports
// --------------

// Import ENV Modules
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });

// Import AWS Helper Functions
const {
    getS3ObjectProperties,
    listDDBObjects,
    ddbClient,
} = require('../helpers/awsHelperFunctions.js');


// -----------
// API QUERIES
// -----------

// Defining List All Music Files API
const listMusic = async (request, response) => {
    try {
        const s3Data = [];
        const DDBdata = await ddbClient.send(listDDBObjects);
        for (let i=0; i < DDBdata.Items.length; i++) {
            const s3_uri = DDBdata.Items[i].s3_uri.S;
            const bucketName = s3_uri.split('/')[2];
            const objectKey = s3_uri.split('/')[3];
            const s3Properties = await getS3ObjectProperties(bucketName, objectKey);
            s3Data.push(objectKey, s3Properties);
        };
    
        response.status(200).send({
            status: 'Success',
            message: 'DynamoDB Music information retrieved',
            DDBdata: DDBdata,
            S3data: s3Data
        });
    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// Defining Get Music by Name API
const getMusic = async (request, response) => {

    try {
        const data = await client.send(getObject);
        response.status(200).send({
            status: 'Success',
            message: 'Music information retrieved',
            data: data
        });
    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// Defining Get PreSigned URL API
const getMusicUrl = async (request, response) => {


    try {
        const data = await client.send(getObject);
        response.status(200).send({
            status: 'Success',
            message: 'Music information retrieved',
            data: data
        });
    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// Defining Post Music API
const postMusic = async (request, response) => {


    try {
        const data = await client.send(putObject);
        response.status(200).send({
            status: 'Success',
            message: 'Music information added',
            data: data
        });
    } 
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// Defining Delete Music API
const deleteMusic = async (request, response) => {


    try {
        const data = await client.send(deleteObject);
        response.status(200).send({
            status: 'Success',
            message: 'Music information deleted',
            data: data
        });
    } 
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};


// ------------
// Export API's
// ------------

//Export Queries
module.exports = {
    listMusic,
    getMusic,
    getMusicUrl,
    postMusic,
    deleteMusic
};