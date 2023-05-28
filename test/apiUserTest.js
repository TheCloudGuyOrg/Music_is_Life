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
        const setupUrl = '/users/upload';
        const name = 'User_Test';
   
        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name,
                'password': name,
                'firstName': name,
                'lastName': name
            });

        const excerciseUrl = '/users/user';
        const expected = 200;

        // Exercise
        const response = await request(app)
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name
            });

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/users/delete';
 
        await request(app)
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name
            });
    });

    it('Status: Sucess', async () => {  
        // Setup
        const setupUrl = '/users/upload';
        const name = 'User_Test';
   
        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name,
                'password': name,
                'firstName': name,
                'lastName': name
            });

        const excerciseUrl = '/users/user';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name
            });

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/users/delete';
 
        await request(app)
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name
            });
    });  
});


// ------------------
// POST /users/upload 
// ------------------

describe('POST /users/upload/', () => {
    it('Status_code: 201', async () => { 
        // Setup
        const name = 'User_Test';

        const excerciseUrl = '/users/upload';
        const expected = 200;

        // Exercise
        const response = await request(app)
            .post(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name,
                'password': name,
                'firstName': name,
                'lastName': name
            });

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/users/delete';
 
        await request(app)
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name
            });  
    });

    it('Status: Success', async () => {  
        // Setup
        const name = 'User_Test';

        const excerciseUrl = '/users/upload';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .post(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name,
                'password': name,
                'firstName': name,
                'lastName': name
            });

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/users/delete';
 
        await request(app)
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name
            });  
    });  
  
    it('Validate: Database Retrieval', async () => {
        // Setup
        const setupUrl = '/users/upload';
        const name = 'User_Test';
   
        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name,
                'password': name,
                'firstName': name,
                'lastName': name
            });

        const excerciseUrl = '/users/user';
        const expected = 'User_Test';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name
            });

        const result = response.body.data.Items[0].Email.S;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/users/delete';
 
        await request(app)
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name
            });  
    });    
});


// -----------------
// PUT /users/update
// -----------------

describe('PUT /users/update', () => {
    it('Status_code: 200', async () => { 
        // Setup
        const setupUrl = '/users/upload';
        const setupName = 'User_Test';
   
        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': setupName,
                'password': setupName,
                'firstName': setupName,
                'lastName': setupName
            });

        const excerciseUrl = '/users/update';
        const excerciseName = 'User_Test2';

        const expected = 200;

        // Exercise
        const response = await request(app)
            .put(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': setupName,
                'password': excerciseName,
                'firstName': excerciseName,
                'lastName': excerciseName
            });

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/users/delete';
 
        await request(app)
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': setupName
            });    
    });

    it('Status: Success', async () => {    
        // Setup
        const setupUrl = '/users/upload';
        const setupName = 'User_Test';
   
        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': setupName,
                'password': setupName,
                'firstName': setupName,
                'lastName': setupName
            });

        const excerciseUrl = '/users/update';
        const excerciseName = 'User_Test2';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .put(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': setupName,
                'password': excerciseName,
                'firstName': excerciseName,
                'lastName': excerciseName
            });

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/users/delete';
 
        await request(app)
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': setupName
            });   
    });

    it('Validate: Database Retrieval', async () => {     
        const setupUrl = '/users/upload';
        const setupName = 'User_Test';
   
        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': setupName,
                'password': setupName,
                'firstName': setupName,
                'lastName': setupName
            });

        const updateUrl = '/users/update';
        const exerciseUrl = '/users/user';
        const excerciseName = 'User_Test2';
        const expected = 'User_Test2';

        // Exercise
        await request(app)
            .put(updateUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': setupName,
                'password': excerciseName,
                'firstName': excerciseName,
                'lastName': excerciseName
            });
        
        const response = await request(app)
            .get(exerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': setupName
            });

        const result = response.body.data.Items[0].Password.S;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/users/delete';
 
        await request(app)
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': setupName
            }); 
    });
});


// --------------------
// DELETE /users/delete
// --------------------

describe('DELETE /users/delete', () => {
    it('Status_code: 200', async () => { 
        // Setup
        const setupUrl = '/users/upload';
        const name = 'User_Test';
   
        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name,
                'password': name,
                'firstName': name,
                'lastName': name
            });

        const excerciseUrl = '/users/delete';
        const expected = 200;

        // Exercise
        const response = await request(app)
            .delete(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name
            });

        const result = response.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Status: Success', async () => {  
        // Setup
        const setupUrl = '/users/upload';
        const name = 'User_Test';
   
        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name,
                'password': name,
                'firstName': name,
                'lastName': name
            });

        const excerciseUrl = '/users/delete';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .delete(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'email': name
            });

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });
});