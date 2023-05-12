//Import Modules
const request = require('supertest');
const assert = require('assert');
const app = require('../app.js');

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

    it('Validate Database Retrieval', async () => {    
        // Setup
        const name = '';
        const excerciseUrl = `/api/${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });
});

describe('GET /api/:name', () => {
    it('status_code: 200', async () => {
        // Setup
        const name = '';
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
        const name = '';
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
        const name = '';
        const excerciseUrl = `/api/${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });
});

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