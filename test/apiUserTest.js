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

    it('Validate: Database Retrieval', async () => {
        // Setup
        const setupUrl = '/users/upload';
   
        const idResponse = await request(app)
            .post(setupUrl);

        const userId = idResponse._body.data.id;

        const excerciseUrl = 'users/list';
        const expected = 'User_Test';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.data[0].name;
        
        // Verify

        assert.equal(result, expected);

        //Teardown
        const teardownUrl = 'users\delete';
 
        await request(app)
            .delete(teardownUrl);
    });
});


// -----------------------------
// GET /users/user Tests by Name
// -----------------------------

describe('GET /users/user', () => {
    it('Status_code: 200', async () => {
        // Setup
        const excerciseUrl = '/users/user';
        const expected = 200;

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Status: Sucess', async () => {  
        // Setup
        const excerciseUrl = '/users/user';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Validate: Database Retrieval', async () => {
        // Setup
	    const setupUrl = '/users/upload';
   
        const idResponse = await request(app)
            .post(setupUrl);

        const userId = idResponse._body.data.id;

        const excerciseUrl = 'users/user';
        const expected = 'User_Test';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.data[0].name;

        // Verify
        assert.equal(result, expected);

        //Teardown
        const teardownUrl = '/users/delete';
 
        await request(app)
            .delete(teardownUrl);
    });
});


// ------------------
// POST /users/upload 
// ------------------

describe('POST /users/upload/', () => {
    it('Status_code: 201', async () => { 
        // Setup
        const excerciseUrl = '/users/upload';
        const expected = 201;

        // Exercise
        const response = await request(app)
            .post(excerciseUrl);

        const result = response.status;
        const userId = response._body.data.id;

        // Verify
        assert.equal(result, expected);

        //Teardown
        const teardownUrl = '/users/delete';
 
        await request(app)
            .delete(teardownUrl);
    });

    it('Status: Success', async () => {  
        // Setup
        const excerciseUrl = '/users/upload';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
        	.post(excerciseUrl);

        const result = response._body.status;
        const userId = response._body.data.id;

        // Verify
        assert.equal(result, expected);

        //Teardown
        const teardownUrl = '/users/delete';
 
        await request(app)
            .delete(teardownUrl);
    });  
  
    it('Validate: Database Retrieval', async () => { 
        // Setup
        const excerciseUrl = '/users/upload';
        const expected = 'User_Test';

        // Exercise
        const response = await request(app)
            .post(excerciseUrl);

        const result = response._body.data.name;
        const userId = response._body.data.id;

        // Verify
        assert.equal(result, expected);

        //Teardown
        const teardownUrl = '/users/test';
 
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
        const setupUrl = '/user/upload';
    
        const idResponse = await request(app)
            .post(setupUrl);

        const userId = idResponse._body.data.id;

        const excerciseUrl = '/users/update';
        const expected = 200;

        // Exercise
        const response = await request(app)
            .put(excerciseUrl);

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        //Teardown
        const teardownUrl = '/users/delete';
 
        await request(app)
            .delete(teardownUrl);
    });

    it('Status: Success', async () => {    
        // Setup
        const setupUrl = '/users/upload';
    
        const idResponse = await request(app)
            .post(setupUrl);

        const userId = idResponse._body.data.id;

        const excerciseUrl = '/users/update';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .put(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        //Teardown
        const teardownUrl = '/users/delete';
 
        await request(app)
            .delete(teardownUrl);
    });

    it('Validate: Database Retrieval', async () => {     
        // Setup
        const setupUrl = '/users/upload';
    
        const idResponse = await request(app)
            .post(setupUrl);

        const userId = idResponse._body.data.id;

        const excerciseUrl = '/users/update';
        const expected = 1;

        // Exercise
        const response = await request(app)
            .put(excerciseUrl);

        const result = response._body.data;

        // Verify
        assert.equal(result, expected);

        //Teardown
        const teardownUrl = '/users/delete';
 
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
        const setupUrl = '/users/upload';
    
        const idResponse = await request(app)
            .post(setupUrl);

        const userId = idResponse._body.data.id;

        const excerciseUrl = '/users/delete';
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
        const setupUrl = '/users/upload';
    
        const idResponse = await request(app)
            .post(setupUrl);

        const userId = idResponse._body.data.id;

        const excerciseUrl = '/users/delete';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .delete(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Validate: Database Retrieval', async () => {
        
        // Setup
        const setupUrl = '/users/upload';
    
        const idResponse = await request(app)
            .post(setupUrl);

        const userId = idResponse._body.data.id;

        const excerciseUrl = '/users/delete';
        const expected = '1';

        // Exercise
        const response = await request(app)
            .delete(excerciseUrl);

        const result = response._body.data;

        // Verify
        assert.equal(result, expected);
    });
});