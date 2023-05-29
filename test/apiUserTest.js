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

// --------------
// GET /api Tests
// --------------

describe('GET /users/list', () => {
    it('Status_code: 200', async () => {
        // Setup
        const excerciseUrl = '/users/list';
        const expected = 200;

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Status: Success', async () => {    
        // Setup
        const excerciseUrl = '/users/list';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

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
   
        await request(app)
            .post(setupUrl);

        const excerciseUrl = `/users/user/?email=${name}`;
        const expected = 200;

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = `/users/delete/?email=${name}`;
 
        await request(app)
            .delete(teardownUrl);
    });

    it('Status: Sucess', async () => {  
        // Setup
        const name = 'User_Test';
        const setupUrl = `/users/upload/?email=${name}&password=${name}&firstName=${name}&lastName=${name}`;
   
        await request(app)
            .post(setupUrl);

        const excerciseUrl = `/users/user/?email=${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = `/users/delete/?email=${name}`;
 
        await request(app)
            .delete(teardownUrl);
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
        const response = await request(app)
            .post(excerciseUrl);

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = `/users/delete/?email=${name}`;
 
        await request(app)
            .delete(teardownUrl);
    });

    it('Status: Success', async () => {  
        // Setup
        const name = 'User_Test';

        const excerciseUrl = `/users/upload/?email=${name}&password=${name}&firstName=${name}&lastName=${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .post(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = `/users/delete/?email=${name}`;
 
        await request(app)
            .delete(teardownUrl);
    });  
  
    it('Validate: Database Retrieval', async () => {
        // Setup
        const name = 'User_Test';
        const setupUrl = `/users/upload/?email=${name}&password=${name}&firstName=${name}&lastName=${name}`;

        await request(app)
            .post(setupUrl);

        const excerciseUrl = `/users/user/?email=${name}`;
        const expected = 'User_Test';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response.body.data.Items[0].Email.S;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = `/users/delete/?email=${name}`;
 
        await request(app)
            .delete(teardownUrl);
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
   
        await request(app)
            .post(setupUrl);

        const excerciseName = 'User_Test2';
        const excerciseUrl = `/users/update/?email=${excerciseName}&password=${excerciseName}&firstName=${excerciseName}&lastName=${excerciseName}`;

        const expected = 200;

        // Exercise
        const response = await request(app)
            .put(excerciseUrl);

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = `/users/delete/?email=${excerciseName}`;
 
        await request(app)
            .delete(teardownUrl); 
    });

    it('Status: Success', async () => {    
        // Setup
        const setupName = 'User_Test';
        const setupUrl = `/users/upload/?email=${setupName}&password=${setupName}&firstName=${setupName}&lastName=${setupName}`;
   
        await request(app)
            .post(setupUrl);

        const excerciseName = 'User_Test2';
        const excerciseUrl = `/users/update/?email=${excerciseName}&password=${excerciseName}&firstName=${excerciseName}&lastName=${excerciseName}`;

        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .put(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = `/users/delete/?email=${excerciseName}`;
 
        await request(app)
            .delete(teardownUrl);
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
   
        await request(app)
            .post(setupUrl);

        const excerciseUrl = `/users/delete/?email=${name}`;
        const expected = 200;

        // Exercise
        const response = await request(app)
            .delete(excerciseUrl);

        const result = response.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Status: Success', async () => {  
        // Setup
        const name = 'User_Test';
        const setupUrl = `/users/upload/?email=${name}&password=${name}&firstName=${name}&lastName=${name}`;
   
        await request(app)
            .post(setupUrl);

        const excerciseUrl = `/users/delete/?email=${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .delete(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });
});