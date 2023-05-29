'use strict';

// --------------
// Module Imports
// --------------

// Import ENV Modules
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });

//Import Mocha Test Modules
const supertest = require('supertest');
const assert = require('assert');

//Import Express App
const app = require('../app.js');
const request = supertest.agent(app);


// --------
// Varables
// --------

// Import ENV Varables
const TESTUSER = process.env.TESTUSER;
const TESTPASSWORD = process.env.TESTPASSWORD;

const userCredentials = {
    email: TESTUSER,
    password: TESTPASSWORD
};


// --------------
// Authentication
// --------------

describe('GET /login', function() {

    it('Should create a session', function(done) {
        const response = request.post('/login')
            .send({ username: TESTUSER, password: TESTPASSWORD })
            .end(function() {
                done();
            });
    });
  
    it('Should return the current session', function(done) {
        request.get('/login').end(function() {
            done();
        });
    });
});


// --------------
// GET /api Tests
// --------------

describe('GET /users/list', () => {
    it('Status_code: 200', async () => {
        // Setup
        const excerciseUrl = '/users/list';
        const expected = 200;

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .send(userCredentials);

        const result = response.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Status: Success', async () => {    
        // Setup
        const excerciseUrl = '/users/list';
        const expected = 'Success';

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .send(userCredentials);;

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });
});


// -----------------------------
// GET /users/user Tests by Name
// -----------------------------

describe('GET /users/user', () => {
    it('Status_code: 200', async () => {
        // Setup
        const name = 'User_Test';
        const setupUrl = `/users/upload/?email=${name}&password=${name}&firstName=${name}&lastName=${name}`;
   
        await request
            .post(setupUrl)
            .send(userCredentials);

        const excerciseUrl = `/users/user/?email=${name}`;
        const expected = 200;

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .send(userCredentials);

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = `/users/delete/?email=${name}`;
 
        await request
            .delete(teardownUrl)
            .send(userCredentials);
    });

    it('Status: Sucess', async () => {  
        // Setup
        const name = 'User_Test';
        const setupUrl = `/users/upload/?email=${name}&password=${name}&firstName=${name}&lastName=${name}`;
   
        await request
            .post(setupUrl)
            .send(userCredentials);

        const excerciseUrl = `/users/user/?email=${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .send(userCredentials);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = `/users/delete/?email=${name}`;
 
        await request
            .delete(teardownUrl)
            .send(userCredentials);
    });  
});


// ------------------
// POST /users/upload 
// ------------------

describe('POST /users/upload', () => {
    it('Status_code: 201', async () => { 
        // Setup
        const name = 'User_Test';

        const excerciseUrl = `/users/upload/?email=${name}&password=${name}&firstName=${name}&lastName=${name}`;
        const expected = 200;

        // Exercise
        const response = await request
            .post(excerciseUrl)
            .send(userCredentials);

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = `/users/delete/?email=${name}`;
 
        await request
            .delete(teardownUrl)
            .send(userCredentials);
    });

    it('Status: Success', async () => {  
        // Setup
        const name = 'User_Test';

        const excerciseUrl = `/users/upload/?email=${name}&password=${name}&firstName=${name}&lastName=${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request
            .post(excerciseUrl)
            .send(userCredentials);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = `/users/delete/?email=${name}`;
 
        await request
            .delete(teardownUrl)
            .send(userCredentials);
    });  
  
    it('Validate: Database Retrieval', async () => {
        // Setup
        const name = 'User_Test';
        const setupUrl = `/users/upload/?email=${name}&password=${name}&firstName=${name}&lastName=${name}`;

        await request
            .post(setupUrl)
            .send(userCredentials);

        const excerciseUrl = `/users/user/?email=${name}`;
        const expected = 'User_Test';

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .send(userCredentials);

        const result = response.body.data.Items[0].Email.S;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = `/users/delete/?email=${name}`;
 
        await request
            .delete(teardownUrl)
            .send(userCredentials);
    });    
});


// -----------------
// PUT /users/update
// -----------------

describe('PUT /users/update', () => {
    it('Status_code: 200', async () => { 
        // Setup
        const setupName = 'User_Test';
        const setupUrl = `/users/upload/?email=${setupName}&password=${setupName}&firstName=${setupName}&lastName=${setupName}`;
   
        await request
            .post(setupUrl)
            .send(userCredentials);

        const excerciseName = 'User_Test2';
        const excerciseUrl = `/users/update/?email=${excerciseName}&password=${excerciseName}&firstName=${excerciseName}&lastName=${excerciseName}`;

        const expected = 200;

        // Exercise
        const response = await request
            .put(excerciseUrl)
            .send(userCredentials);

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = `/users/delete/?email=${excerciseName}`;
 
        await request
            .delete(teardownUrl)
            .send(userCredentials); 
    });

    it('Status: Success', async () => {    
        // Setup
        const setupName = 'User_Test';
        const setupUrl = `/users/upload/?email=${setupName}&password=${setupName}&firstName=${setupName}&lastName=${setupName}`;
   
        await request
            .post(setupUrl)
            .send(userCredentials);

        const excerciseName = 'User_Test2';
        const excerciseUrl = `/users/update/?email=${excerciseName}&password=${excerciseName}&firstName=${excerciseName}&lastName=${excerciseName}`;

        const expected = 'Success';

        // Exercise
        const response = await request
            .put(excerciseUrl)
            .send(userCredentials);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = `/users/delete/?email=${excerciseName}`;
 
        await request
            .delete(teardownUrl)
            .send(userCredentials);
    });
});


// --------------------
// DELETE /users/delete
// --------------------

describe('DELETE /users/delete', () => {
    it('Status_code: 200', async () => { 
        // Setup
        const name = 'User_Test';
        const setupUrl = `/users/upload/?email=${name}&password=${name}&firstName=${name}&lastName=${name}`;
   
        await request
            .post(setupUrl)
            .send(userCredentials);

        const excerciseUrl = `/users/delete/?email=${name}`;
        const expected = 200;

        // Exercise
        const response = await request
            .delete(excerciseUrl)
            .send(userCredentials);

        const result = response.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Status: Success', async () => {  
        // Setup
        const name = 'User_Test';
        const setupUrl = `/users/upload/?email=${name}&password=${name}&firstName=${name}&lastName=${name}`;
   
        await request
            .post(setupUrl)
            .send(userCredentials);

        const excerciseUrl = `/users/delete/?email=${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request
            .delete(excerciseUrl)
            .send(userCredentials);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });
});