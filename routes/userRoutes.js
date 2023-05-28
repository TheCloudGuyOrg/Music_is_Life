'use strict';

// --------------
// Module Imports
// --------------

// Use Express
const express = require('express');
const userApi = express.Router();

// Import Queries
const {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
} = require('../api/userAPIs.js');


// ----------
// API Routes
// ----------

// User API Routes
userApi.get('/list', getUsers);
userApi.get('/user', getUserById);
userApi.post('/upload', addUser);
userApi.put('/update', updateUser);
userApi.delete('/delete', deleteUser);

// ------------
// Export API's
// ------------

// Export API
module.exports = userApi;