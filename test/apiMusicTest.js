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
});