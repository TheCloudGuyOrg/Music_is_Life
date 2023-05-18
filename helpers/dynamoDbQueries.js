'use strict';

// Import Varables
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const consistentRead = false;

// Import DynamoDB Modules
const {
    DynamoDBClient, 
    QueryCommand,
    ScanCommand,
    PutItemCommand,
    DeleteItemCommand
} = require('@aws-sdk/client-dynamodb');

// Defining DynamoDB Client
const client = new DynamoDBClient({ 
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
    region: 'us-east-1',
});

const getMusic = async (request, response) => {
    const name = request.params.name;
    
    const getObject = new QueryCommand({
        'TableName': 'Music-Is-Life-Artist-Track',
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
    const name = request.body.name;
    const track = request.body.track;
    const year = request.body.year;
    const s3_uri = request.body.s3_uri;

    const putObject = new PutItemCommand({
        'TableName': 'Music-Is-Life-Artist-Track',
        'Item': {
            'Artist': {
                'S': name
            },
            'Track': {
                'S': track
            },
            'Year': {
                'N': year
            },
            's3_uri': {
                'S': s3_uri
            }
        }
    });

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

const deleteMusic = async (request, response) => {
    const name = request.body.name;
    const track = request.body.track;

    const deleteObject = new DeleteItemCommand({
        'TableName': 'Music-Is-Life-Artist-Track',
        'Key': {
            'Artist': {
                'S': name
            },
            'Track': {
                'S': track
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
    getMusic,
    postMusic,
    deleteMusic
};