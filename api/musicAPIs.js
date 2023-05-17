'use strict';

// --------------
// Module Imports
// --------------

// Import Moules
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });

// Import awsHelperFunctions
const {
    getS3ObjectProperties
} = require('../helpers/awsHelperFunctions.js');

// Import DynamoDB Modules
const {
    DynamoDBClient, 
    QueryCommand,
    ScanCommand,
    PutItemCommand,
    DeleteItemCommand
} = require('@aws-sdk/client-dynamodb');


// --------
// Varables
// --------

// Import AWS Access Keys
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

// DynamoDB Varables
const consistentRead = false;

// S3 Varables
const BUCKET = process.env.BUCKET;


// ---------------
// AWS SDK Clients
// ---------------

// Defining DynamoDB Client
const ddbClient = new DynamoDBClient({ 
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
    region: 'us-east-1',
});

// -----------
// API QUERIES
// -----------

// Defining List All Music Files API
const listMusic = async (request, response) => {
    const listDDBObjects = new ScanCommand({
        'TableName': 'Music-Is-Life-Artist-Track',
        'ConsistentRead': consistentRead,
    });

    try {
        const s3Array = [];
        const data = await ddbClient.send(listDDBObjects);
        for (let i=0; i < data.Items.length; i++) {
            const s3_uri = data.Items[i].s3_uri.S;
            const bucketName = s3_uri.split('/')[2];
            const objectKey = s3_uri.split('/')[3];
            const s3Properties = await getS3ObjectProperties(bucketName, objectKey);
            s3Array.push(objectKey, s3Properties);
        };
    
        response.status(200).send({
            status: 'Success',
            message: 'DynamoDB Music information retrieved',
            DDBdata: data,
            S3data: s3Array
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