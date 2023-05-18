//Import Modules
const request = require('supertest');
const assert = require('assert');
const app = require('../app.js');

//Test: GET /db/:name
describe('GET /db/:name', () => {

    it('Validate: Database Retrieval', async () => {
        // Setup
        const setupUrl = '/db';
        const name = 'Test';
        const year = 1900;
   
        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name,
                'year': year,
                's3_uri': name
            });  

        const excerciseUrl = '/db/';
        const expected = 'Test';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);
		
        const output = response._body.data.Items;
        for (i = 0; i < output.length; i++) {
            if (output[i].Artist.S === name) {
                result = output[i].Artist.S;
            }	
        }

        // Verify
        assert.equal(result, expected);

        //Teardown
        const teardownUrl = `/db/${name}`;

        await request(app)
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });
    });

});

//Test: Post /db
describe('POST /db', () => {
    it('status_code: 200', async () => { 
        // Setup
        const name = 'Test';
        const year = 1900;
        const excerciseUrl = '/db';
        const expected = 200;

        // Exercise
        const response = await request(app)
            .post(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name,
                'year': year,
                's3_uri': name
            });  

        const result = response.statusCode;

        // Verify
        assert.equal(result, expected);

        //Teardown
        const teardownUrl = `/db/${name}`;
 
        await request(app)
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });
    });

    it('Status: Success', async () => {  
        // Setup
        const name = 'Test';
        const year = 1900;
        const excerciseUrl = '/db';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .post(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name,
                'year': year,
                's3_uri': name
            });  

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        //Teardown
        const teardownUrl = `/db/${name}`;
 
        await request(app)
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });
    });

    it('Validate: Database Retrieval', async () => { 
    // Setup
        const name = 'Test';
        const year = 1900;
        const excerciseUrl = '/db';
        const expected = 'Test';

        // Exercise
        const response = await request(app)
            .post(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name,
                'year': year,
                's3_uri': name
            });  
		
        const result = response.request._data.name;
    
        // Verify
        assert.equal(result, expected);

        //Teardown
        const teardownUrl = `/db/${name}`;
 
        await request(app)
            .delete(teardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });
    });
});

//Test: DELETE /db/:name
describe('DELETE /db/:name', () => {
    it('status_code: 200', async () => { 
        // Setup
        const setupUrl = '/db';
        const name = 'Test';
        const year = 1900;

        await request(app)
	        .post(setupUrl)
	        .set('Content-Type', 'application/x-www-form-urlencoded')
	        .send({
		        'name': name,
		        'track': name,
		        'year': year,
		        's3_uri': name
	        });  

        const excerciseUrl = `/db/${name}`;
        const expected = '200';

        // Exercise
        const response = await request(app)
            .delete(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });

        const result = response.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Status: Success', async () => {  
        // Setup
        const setupUrl = '/db';
        const name = 'Test';
        const year = 1900;

        await request(app)
	        .post(setupUrl)
	        .set('Content-Type', 'application/x-www-form-urlencoded')
	        .send({
		        'name': name,
		        'track': name,
		        'year': year,
		        's3_uri': name
	        });  

        const excerciseUrl = `/db/${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .delete(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });
});