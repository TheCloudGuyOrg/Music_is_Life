'use strict';

// --------------
// Module Imports
// --------------

// Import ENV Modules
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });

// Import DynamoDB Modules
const {
    DynamoDBClient, 
    QueryCommand
} = require('@aws-sdk/client-dynamodb');

// --------
// Varables
// --------

// Import ENV Varables
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;


// -----------
// AWS Clients
// -----------

// Defining DynamoDB Client
const ddbClient = new DynamoDBClient({ 
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
    region: 'us-east-1',
});

// ----------------
// DynamoDB Helpers
// ----------------

// Get User by Email
const getUserByEmail = async (email) => {

    const getObject = new QueryCommand({
        'TableName': 'Music-Is-Life-Users',
        'Select': 'ALL_ATTRIBUTES',
        'ExpressionAttributeValues': {
            ':v1': {
                'S': email
            }
        },
        'KeyConditionExpression': 'Email = :v1',
        'ConsistentRead': false,
    });

    try {
        if(!email) {
            return 'The User does not exist';
        } else {
            const user = await ddbClient.send(getObject);
            return user;
        };
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
module.exports = { getUserByEmail };