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
    deleteMusic
};