'use strict';

// Import Moules
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });

// Import AWS
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

// DynamoDB Varables
const consistentRead = false;

// S3 Varables
const BUCKET = process.env.BUCKET;

// Import S3 Modules
const {
    S3Client, 
    ListObjectsCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Import DynamoDB Modules
const {
    DynamoDBClient, 
    QueryCommand,
    ScanCommand,
    PutItemCommand,
    DeleteItemCommand
} = require('@aws-sdk/client-dynamodb');

// Defining S3 Client
const s3Client = new S3Client({ 
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
    region: 'us-east-1',
});


// Defining DynamoDB Client
const ddbClient = new DynamoDBClient({ 
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
    region: 'us-east-1',
});

// Defining List All Music Files API
const listMusic = async (request, response) => {
    

    try {
        const data = await client.send(listObjects);
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

//Export Queries
module.exports = {
    listMusic,
    getMusic,
    getMusicUrl,
    postMusic,
    deleteMusic
};