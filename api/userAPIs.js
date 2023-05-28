'use strict';

// --------------
// Module Imports
// --------------

// Import ENV Modules
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });

// Import DynamoDB Modules
const {
    DynamoDBClient
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
    
    try {

    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// GET User by name API - GET /users/user
const getUserById = async (request, response) => {
    
    try {

    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// POST new user API - GET /users/upload
const addUser = async (request, response) => {
    
    try {

    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// UPDATE existing user API - GET /users/update
const updateUser = async (request, response) => {
    
    try {

    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// DELETE user API - GET /users/delete
const deleteUser = async (request, response) => {
    
    try {

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
    getUserById,
    addUser,
    updateUser,
    deleteUser
};