'use strict';

// --------------
// Module Imports
// --------------

// Import ENV Modules
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });

//Import Mocha Test Modules
const request = require('supertest');
const assert = require('assert');

//Import Express App
const app = require('../app.js');


// --------
// Varables
// --------

// Import ENV Varables
const TESTUSER = process.env.TESTUSER;
const TESTPASSWORD = process.env.TESTPASSWORD;


// --------------
// Authentication
// --------------

// Import ENV Varables
const userCredentials = {
    email: TESTUSER,
    password: TESTPASSWORD
};

const authenticatedUser = request.agent(app);
before(function(done){
    authenticatedUser
        .post('/login')
        .send(userCredentials)
        .end(function(err, response){
            expect(response.statusCode).to.equal(200);
            expect('Location', '/home');
            done();
        });
});