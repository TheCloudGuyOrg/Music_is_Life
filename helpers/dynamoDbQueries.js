'use strict';

// Import Varables
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const consistentRead = false;

// Import S3 Modules
const {
    DynamoDBClient, 
    QueryCommand,
    ScanCommand,
    DeleteItemCommand
} = require('@aws-sdk/client-dynamodb');

// Defining S3 Client
const client = new DynamoDBClient({ 
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
    region: 'us-east-1',
});

const listMusic = async (request, response) => {
    const listObjects = new ScanCommand({
        'TableName': 'Music-Is-Life',
        'ConsistentRead': consistentRead,
    });

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

const getMusic = async (request, response) => {
    const name = request.params.name;
    
    const getObject = new QueryCommand({
        'TableName': 'Music-Is-Life',
        'Select': 'ALL_ATTRIBUTES',
        'ExpressionAttributeValues': {
            ':v1': {
                'S': name
            }
        },
        'KeyConditionExpression': 'Artist = :v1',
        'ConsistentRead': consistentRead,
    });

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

const postMusic = async (request, response) => {
    console.log(client, request, response);
};

const deleteMusic = async (request, response) => {
    const name = request.params.name;
    const deleteObject = new DeleteItemCommand({
        'TableName': 'Music-Is-Life',
        'Key': {
            'Artist': {
                'S': name
            }
        }
    });

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
    postMusic,
    deleteMusic
};