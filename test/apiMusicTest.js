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
const BUCKET = process.env.BUCKET;
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


// -------------------
// GET /api/list Tests
// -------------------

describe('GET /api/list', () => {
    it('Status_code: 200', async () => {
        // Setup
        const excerciseUrl = '/api/list';
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
        const excerciseUrl = '/api/list';
        const expected = 'Success';

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .send(userCredentials);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });

    it('DB Status_code: 200', async () => {
        // Setup
        const excerciseUrl = '/api/list';
        const expected = 200;

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .send(userCredentials);

        const result = response._body.DDBdata.$metadata.httpStatusCode;

        // Verify
        assert.equal(result, expected);
    });

    it('S3 Status_code: 200', async () => {
        // Setup
        const excerciseUrl = '/api/list';
        const expected = 200;

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .send(userCredentials);

        const result = response._body.S3data[1].$metadata.httpStatusCode;

        // Verify
        assert.equal(result, expected);
    });
});


// ----------------------------------
// GET /api/artist Tests by File Name
// ----------------------------------

describe('GET /api/artist', () => {
    it('Status_code: 200', async () => {
        // Setup
        const setupUrl = '/api/upload'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            })
            .send(userCredentials);  

        const excerciseUrl = '/api/artist';
        const expected = '200';

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name
            })
            .send(userCredentials);

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/api/delete';

        await request
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name
            })
            .send(userCredentials);

    }).timeout(5000);

    it('Status: Success', async () => {
        // Setup
        const setupUrl = '/api/upload'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            })
            .send(userCredentials);  
	
        const excerciseUrl = '/api/artist';
        const expected = 'Success';

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name
            })
            .send(userCredentials);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/api/delete';

        await request
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name
            })
            .send(userCredentials);

    }).timeout(5000);

    it('DB Status_code: 200', async () => {
        // Setup
        const setupUrl = '/api/upload'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            })
            .send(userCredentials);  
	
        const excerciseUrl = '/api/artist';
        const expected = '200';

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name
            })
            .send(userCredentials);

        const result = response._body.DDBdata.$metadata.httpStatusCode;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/api/delete';

        await request
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name
            })
            .send(userCredentials);

    }).timeout(5000);

    it('S3 Status_code: 200', async () => {
        // Setup
        const setupUrl = '/api/upload'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            })
            .send(userCredentials); 
	
        const excerciseUrl = '/api/artist';
        const expected = '200';

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name
            })
            .send(userCredentials);

        const result = response._body.S3data[1].$metadata.httpStatusCode;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/api/delete';

        await request
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name
            })
            .send(userCredentials);

    }).timeout(5000);
});


// --------------------------
// GET S3 Presigned URL Tests
// --------------------------

describe('GET /api/url', () => {
    it('Status_code: 200', async () => {
        // Setup
        const setupUrl = '/api/upload'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            })
            .send(userCredentials); 
	
        const excerciseUrl = '/api/url';
        const expected = '200';

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name
            })
            .send(userCredentials);

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/api/delete';

        await request
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name
            })
            .send(userCredentials);

    }).timeout(5000);

    it('Status: Success', async () => {
        // Setup
        const setupUrl = '/api/upload'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            })
            .send(userCredentials); 
	
        const excerciseUrl = '/api/url';
        const expected = 'Success';

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name
            })
            .send(userCredentials);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/api/delete';

        await request
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name
            })
            .send(userCredentials);

    }).timeout(5000);

    it('Validate Returning PreSigned URL', async () => {
        // Setup
        const setupUrl = '/api/upload'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';
        const bucket = BUCKET;

        await request
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            })
            .send(userCredentials); 
	
        const excerciseUrl = '/api/url';
        const expected = `${bucket}.s3.us-east-1.amazonaws.com/${file}`;
    
        // Exercise
        const response = await request
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name
            })
            .send(userCredentials);           

        const s3Url = response._body.S3PreSignedURL;
        const result = s3Url.split('/')[2] + '/' + file;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/api/delete';

        await request
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name
            })
            .send(userCredentials);

    }).timeout(5000);
});


// ----------------------
// POST /api/upload Tests
// ----------------------

describe('POST /api/upload', () => {
    it('Status_code: 200', async () => {
        // Setup
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        const excerciseUrl = '/api/upload';
        const expected = 200;

        // Exercise
        const response = await request
            .post(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            })
            .send(userCredentials); 

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/api/delete';

        await request
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name
            })
            .send(userCredentials);

    }).timeout(5000);

    it('Status: Success', async () => {    
        // Setup
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        const excerciseUrl = '/api/upload';
        const expected = 'Success';

        // Exercise
        const response = await request
            .post(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            })
            .send(userCredentials); 

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/api/delete';

        await request
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name
            })
            .send(userCredentials);
    }).timeout(5000);    

    it('Validate: Database Retrieval', async () => {
        // Setup
        const setupUrl = '/api/upload'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            })
            .send(userCredentials); 
	
        const excerciseUrl = '/api/artist';
        const expected = 'Test';

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name
            })
            .send(userCredentials);

        const result = response._body.DDBdata.Items[0].Artist.S;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/api/delete';

        await request
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name
            })
            .send(userCredentials);

    }).timeout(5000);

    it('Validate: Storage Retrieval', async () => {
        // Setup
        const setupUrl = '/api/upload'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            })
            .send(userCredentials); 
	
        const excerciseUrl = '/api/artist';
        const expected = 'Test.m4a';

        // Exercise
        const response = await request
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name
            })
            .send(userCredentials);

        const result = response._body.S3data[0];

        // Verify
        assert.equal(result, expected);

        // Teardown
        const teardownUrl = '/api/delete';

        await request
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name
            })
            .send(userCredentials);

    }).timeout(5000);
});


// ------------------------------
// DELETE /api Tests by File Name
// ------------------------------

describe('DELETE /api', () => {
    it('Status_code: 200', async () => {
        // Setup
        const setupUrl = '/api/upload'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            })
            .send(userCredentials); 

        const excerciseUrl = '/api/delete';
        const expected = 200;

        // Exercise
        const response = await request
            .delete(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name
            })
            .send(userCredentials);

        const result = response.status;

        // Verify
        assert.equal(result, expected);

    }).timeout(5000);

    it('Status: Success', async () => {
        // Setup
        const setupUrl = '/api/upload'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            })
            .send(userCredentials); 

        const excerciseUrl = '/api/delete';
        const expected = 'Success';

        // Exercise
        const response = await request
            .delete(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name
            })
            .send(userCredentials);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

    }).timeout(5000);

    it('DB Status_code: 200', async () => {
        // Setup
        const setupUrl = '/api/upload'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            })
            .send(userCredentials); 

        const excerciseUrl = '/api/delete';
        const expected = 200;

        // Exercise
        const response = await request
            .delete(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name
            })
            .send(userCredentials);

        const result = response._body.DDBdata.$metadata.httpStatusCode;

        // Verify
        assert.equal(result, expected);

    }).timeout(5000);

    it('S3 Status_code: 204', async () => {
        // Setup
        const setupUrl = '/api/upload'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            })
            .send(userCredentials); 

        const excerciseUrl = '/api/delete';
        const expected = 204;

        // Exercise
        const response = await request
            .delete(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name
            })
            .send(userCredentials);

        const result = response._body.S3data.$metadata.httpStatusCode;

        // Verify
        assert.equal(result, expected);
        
    }).timeout(5000);
});
