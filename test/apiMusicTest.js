'use strict';

// --------------
// Module Imports
// --------------

//Import Modules
const request = require('supertest');
const assert = require('assert');
const app = require('../app.js');


// --------------
// GET /api Tests
// --------------

//Test: GET /api
describe('GET /api', () => {
    it('status_code: 200', async () => {
        // Setup
        const excerciseUrl = '/api';
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
        const excerciseUrl = '/api';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });

    it('DB status_code: 200', async () => {
        // Setup
        const excerciseUrl = '/api';
        const expected = 200;

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.DDBdata.$metadata.httpStatusCode;

        // Verify
        assert.equal(result, expected);
    });

    it('S3 status_code: 200', async () => {
        // Setup
        const excerciseUrl = '/api';
        const expected = 200;

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.S3data[1].$metadata.httpStatusCode;

        // Verify
        assert.equal(result, expected);
    });
});


// ---------------------------
// GET /api Tests by File Name
// ---------------------------

describe('GET /api/:name', () => {
    it('status_code: 200', async () => {
        // Setup
        const name = 'Test.m4a';
        const excerciseUrl = `/api/${name}`;
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
        const name = 'Test.m4a';
        const excerciseUrl = `/api/${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Validate Database Retrieval', async () => {    
        // Setup
        const name = 'Test.m4a';
        const excerciseUrl = `/api/${name}`;
        const expected = '';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });
});


// --------------------------
// GET S3 Presigned URL Tests
// --------------------------

describe('GET /api/url/:name', () => {
    it('status_code: 200', async () => {
        // Setup
        const name = '';
        const excerciseUrl = `/api/url/${name}`;
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
        const name = '';
        const excerciseUrl = `/api/url/${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Validate Returning PreSigned URL', async () => {    
        // Setup
        const name = '';
        const excerciseUrl = `/api/url/${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });
});


// ---------------
// POST /api Tests
// ---------------

describe('POST /api', () => {
    it('status_code: 200', async () => {
        // Setup
        const excerciseUrl = '/api';
        const expected = 200;

        // Exercise
        const response = await request(app)
            .post(excerciseUrl);

        const result = response.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Status: Success', async () => {    
        // Setup
        const excerciseUrl = '/api';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .post(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Validate DB Entry', async () => {    
        // Setup
        const excerciseUrl = '/api';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .post(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Validate S3 Entry', async () => {    
        // Setup
        const excerciseUrl = '/api';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .post(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });
});


// ------------------------------
// DELETE /api Tests by File Name
// ------------------------------

describe('DELETE /api/:name', () => {
    it('status_code: 200', async () => {
        // Setup
        const name = '';
        const excerciseUrl = `/api/${name}`;
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
        const name = '';
        const excerciseUrl = `/api/${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .delete(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Validate DB Removal', async () => {    
        // Setup
        const name = '';
        const excerciseUrl = `/api/${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .delete(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Validate S3 Removal', async () => {    
        // Setup
        const name = '';
        const excerciseUrl = `/api/${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .delete(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });
});