'use strict';

// --------------
// Module Imports
// --------------

// Import ENV Modules
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });

//Import bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Import DynamoDB Modules
const {
    DynamoDBClient,    
    ScanCommand,
    QueryCommand,
    PutItemCommand,
    DeleteItemCommand
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


// -----------
// API QUERIES
// -----------

// GET all Users API - GET /users/list
const getUsers = async (request, response) => {
    const listObjects = new ScanCommand({
        'TableName': 'Music-Is-Life-Users',
        'ConsistentRead': false,
    });
    try {
        const data = await ddbClient.send(listObjects);

        if(data.Items.length <= 0) {
            response.status(404).send({
                message: 'The User selected does not exist'
            });
        }
        else {  
            response.status(200).send({
                status: 'Success',
                message: 'User infomation retrieved from Database',
                data: data,
            });
        }
    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// GET User by Email API - GET /users/user
const getUserByEmail = async (request, response) => {
    const email = request.query.email;

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
        const data = await ddbClient.send(getObject);

        if(data.Items[0] === undefined) {
            response.status(404).send({
                message: 'The User selected does not exist'
            });
        } else {
            response.status(200).send({
                status: 'Success',
                message: 'The User information was retrived',
                data: data
            });
        }
    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// POST new user API - GET /users/upload
const addUser = async (request, response) => {
    const email = request.query.email;
    const password = request.query.password;
    const firstName = request.query.firstName;
    const lastName = request.query.lastName;

    try {
        bcrypt.hash(password, saltRounds, async function(error, hash) {
            const postObject = new PutItemCommand({
                'TableName': 'Music-Is-Life-Users',
                'Item': {
                    'Email': {
                        'S': email
                    },
                    'Password': {
                        'S': hash
                    },
                    'First Name': {
                        'S': firstName
                    },
                    'Last Name': {
                        'S': lastName
                    }
                }
            });
            
            const data = await ddbClient.send(postObject);

            if(data === undefined) {
                response.status(404).send({
                    message: 'Could not complete the User upload'
                });
            } 
            else {
                response.status(200).send({
                    status: 'Success',
                    message: 'The User has been uploaded',
                    data: data
                });
            }
        });
    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// UPDATE existing user API - GET /users/update
const updateUser = async (request, response) => {
    const email = request.query.email;
    const password = request.query.password;
    const firstName = request.query.firstName;
    const lastName = request.query.lastName;

    try {
        bcrypt.hash(password, saltRounds, async function(error,hash) {
            const postObject = new PutItemCommand({
                'TableName': 'Music-Is-Life-Users',
                'Item': {
                    'Email': {
                        'S': email
                    },
                    'Password': {
                        'S': hash
                    },
                    'First Name': {
                        'S': firstName
                    },
                    'Last Name': {
                        'S': lastName
                    }
                }
            });

            const data = await ddbClient.send(postObject);

            if(data === undefined) {
                response.status(404).send({
                    message: 'Could not complete the User upload'
                });
            } 
            else {
                response.status(200).send({
                    status: 'Success',
                    message: 'The User has been uploaded',
                    data: data
                });
            }
        });
    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// DELETE user API - GET /users/delete
const deleteUser = async (request, response) => {
    const email = request.query.email;

    const deleteObject = new DeleteItemCommand({
        'TableName': 'Music-Is-Life-Users',
        'Key': {
            'Email': {
                'S': email
            }
        }
    });

    try {
        const data = await ddbClient.send(deleteObject);

        if(data === undefined) {
            response.status(404).send({
                message: 'The User selected does not exist'
            });
        } else {
            response.status(200).send({
                status: 'Success',
                message: 'The User was deleted',
                data: data
            });
        }
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
    getUsers,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser
};